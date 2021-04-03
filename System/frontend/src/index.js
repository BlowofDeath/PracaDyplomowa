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
import jwt from "jsonwebtoken";

import Application from "@bundles";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path, extensions }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
      if (extensions.code === "UNAUTHENTICATED") {
        console.log("remove token");
        localStorage.removeItem("token");
        localStorage.removeItem("userType");
      }
    });
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

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
  new HttpLink({ uri: "http://localhost:4001/graphql" }),
]);

const client = new ApolloClient({
  link: additiveLink,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <SnackbarProvider maxSnack={3}>
    <React.StrictMode>
      <ApolloProvider client={client}>
        <Application />
      </ApolloProvider>
    </React.StrictMode>
  </SnackbarProvider>,

  document.getElementById("root")
);
