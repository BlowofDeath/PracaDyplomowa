import React from "react";
import ReactDOM from "react-dom";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { SnackbarProvider } from "notistack";
import jwt from "jsonwebtoken";

import Application from "@bundles";

const token = localStorage.getItem("token");

const client = new ApolloClient({
  uri: "http://localhost:4001/graphql",
  cache: new InMemoryCache(),
  headers: {
    authorization: token ?? "",
  },
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
