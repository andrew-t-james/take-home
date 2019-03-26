import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import styled, { createGlobalStyle } from "styled-components";

const CRYSTALLIZE_QUERY = gql`
  {
    catalogue(url: "/illustrations", tenantID: "demo") {
      name
      content_fields
      children {
        link
        name
        product {
          name
          product_image
          variations {
            variation_sku
            stock_count
            price_ex_vat
          }
        }
      }
    }
  }
`;

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }
  body {
    color: red;
    font-size: 62.5%;
  }
`;

const AppContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 1rem;
`;

const App = () => (
  <>
    <GlobalStyle />
    <AppContainer>
      <Query query={CRYSTALLIZE_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          return <>{JSON.stringify(data, null, 2)}</>;
        }}
      </Query>
    </AppContainer>
  </>
);

export default App;
