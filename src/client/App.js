import React from "react";
import styled from "styled-components";

const AppContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 40px;
  color: red;
`;

const App = () => <AppContainer>Hello World</AppContainer>;

export default App;
