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

import Application from "@bundles";

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql error ${message}`);
    });
  }
});
const link = from([
  errorLink,
  new HttpLink({ uri: "http://localhost:4001/graphql" }),
]);

const client = new ApolloClient({
  link: link,
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
