import React from "react";

const Html = ({ body, client: { cache } }) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Take Home SSR React GraphQL</title>
      <link rel="stylesheet" href="${assets.client.css}" />
    </head>
    <body>
      <div id="app" dangerouslySetInnerHTML={{ __html: body }} />
      <script
        charSet="UTF-8"
        dangerouslySetInnerHTML={{
          __html: `window.__APOLLO_STATE__=${JSON.stringify(cache.extract())};`
        }}
      />
    </body>
  </html>
);

export default Html;
