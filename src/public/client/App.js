import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import styled, { createGlobalStyle } from "styled-components";

const CRYSTALLIZE_QUERY = gql`
  {
    catalogue(url: "/illustrations", tenantID: "demo") {
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
    color: rgb(244, 127, 152);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 62.5%;
  }
`;

const AppContainer = styled.div`
  max-width: 1024px;
  margin: 0 auto;
`;

const StyledList = styled.div`
  display: flex;
  display: grid;
  grid-column-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  padding: 2rem;

  @media screen and (max-width: 436px) {
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  }

  @media screen and (max-width: 350px) {
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  }
`;

const StyledListItem = styled.div`
  border-radius: 0.4rem;
  text-align: center;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.05) 3px 14px 24px;
  background: rgb(255, 255, 255);
  border: 1px solid rgb(223, 223, 223);
  margin: 2rem;
  padding: 2rem;

  h2 {
    font-size: 1.4rem;
    margin-bottom: 1.5rem;
  }

  img {
    height: 10rem;
  }
`;

const App = () => (
  <>
    <GlobalStyle />
    <AppContainer>
      <Query query={CRYSTALLIZE_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          return (
            <StyledList>
              {data.catalogue.children.map(child => (
                <StyledListItem key={child.name}>
                  <h2>{child.name}</h2>
                  <img src={child.product.product_image} alt={child.name} />
                </StyledListItem>
              ))}
            </StyledList>
          );
        }}
      </Query>
    </AppContainer>
  </>
);

export default App;
