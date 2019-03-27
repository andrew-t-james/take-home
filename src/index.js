import express from "express";
import React from "react";
// import { renderToString } from "react-dom/server";
import fetch from "isomorphic-fetch";
import { ServerStyleSheet } from "styled-components";
import { ApolloProvider, renderToStringWithData } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import App from "./public/client/App";
import { InMemoryCache } from "apollo-cache-inmemory";

const port = 3000;
const server = express();
server.get("/", (req, res) => {
  const client = new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: true,
    link: createHttpLink({
      fetch,
      uri: "http://api.crystallize.com/graphql"
    }),
    cache: process.browser
      ? new InMemoryCache().restore(window.__APOLLO_STATE__)
      : new InMemoryCache(),
    ssrForceFetchDelay: 100
  });

  const sheet = new ServerStyleSheet();
  const styleTags = sheet.getStyleTags();

  const component = (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );

  renderToStringWithData(component)
    .then(content => {
      res.status(200);
      const html = `
        <html lang="en">
          <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>Take Home SSR React GraphQL</title>
            ${styleTags}
          </head>
          <body>
            <div id="app">${content}</div>
            <script>
              window.__APOLLO_STATE__ = ${JSON.stringify(
                client.extract()
              ).replace(/</g, "\\u003c")}
            </script>
          </body>
        </html>
      `;
      res.send(html);
      res.end();
    })
    .catch(e => {
      console.error("RENDERING ERROR:", e); // eslint-disable-line no-console
      res.status(500);
      res.end(
        `An error occurred with the following stack trace:\n\n${e.stack}`
      );
    });
});

server.listen(port);
console.log(`Serving at http://localhost:${port}`); // eslint-disable-line no-console
