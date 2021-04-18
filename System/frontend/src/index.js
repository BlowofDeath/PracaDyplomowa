import React from "react";
import ReactDOM from "react-dom";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  from,
  ApolloLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { SnackbarProvider } from "notistack";
import { RecoilRoot } from "recoil";
import { createUploadLink } from "apollo-upload-client";
import jwt from "jsonwebtoken";

import Application from "@bundles";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path, extensions }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
      if (extensions.code === "UNAUTHENTICATED") {
        localStorage.removeItem("token");
        localStorage.removeItem("userType");
        window.location.reload();
      }
    });
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

console.log(process.env.NODE_ENV);

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const token = localStorage.getItem("token");
  operation.setContext({
    headers: {
      authorization: token?.replace(/['"]+/g, "") || "",
    },
  });

  return forward(operation);
});

const additiveLink = from([
  errorLink,
  authMiddleware,
  // new HttpLink({
  //   uri:
  // process.env.NODE_ENV === "development"
  //   ? "http://localhost:4001/graphql"
  //   : "https://sep-praca-dyplomowa.herokuapp.com/graphql",
  // }),
  createUploadLink({
    uri:
      process.env.NODE_ENV === "development"
        ? "http://localhost:4001/graphql"
        : "https://sep-praca-dyplomowa.herokuapp.com/graphql",
  }),
]);

const client = new ApolloClient({
  link: additiveLink,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <RecoilRoot>
    <SnackbarProvider maxSnack={3}>
      <React.StrictMode>
        <ApolloProvider client={client}>
          <Application />
        </ApolloProvider>
      </React.StrictMode>
    </SnackbarProvider>
  </RecoilRoot>,

  document.getElementById("root")
);
