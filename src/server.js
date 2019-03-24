import express from "express";
import React from "react";
import fetch from "isomorphic-fetch";
import { renderToString } from "react-dom/server";
import App from "./client/App";
import Html from "./client/Html";
import { ServerStyleSheet } from "styled-components";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const port = 3000;
const server = express();
server.get("/", (req, res) => {
  const sheet = new ServerStyleSheet();
  const client = new ApolloClient({
    ssrMode: true,
    // Remember that this is the interface the SSR server will use to connect to the
    // API server, so we need to ensure it isn't firewalled, etc
    link: createHttpLink({
      fetch,
      uri: "http://api.crystallize.com/graphql"
    }),
    cache: new InMemoryCache()
  });

  const body = renderToString(
    sheet.collectStyles(
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    )
  );

  const styles = sheet.getStyleTags();
  const title = "SSR GraphQL React with Styled Components";

  res.send(
    Html({
      body,
      styles,
      title
    })
  );
});

server.listen(port);
console.log(`Serving at http://localhost:${port}`);
