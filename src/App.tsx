import React from 'react';
import styled from 'styled-components';
import Board from './components/Board';
import GlobalStyles from './components/Global';
import Header from './components/Header';

const MainContainer = styled.main`
  background: white;
`;

const App: React.FC = () => {
  return (
    <MainContainer>
      <GlobalStyles />
      <Header />
      <Board />
    </MainContainer>
  )
};

export default App;
