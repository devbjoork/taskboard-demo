import React from 'react';
import styled from 'styled-components';
import BoardContent from './components/BoardContent';

import GlobalStyles from './components/Global';

const MainContainer = styled.main`
  padding: 3em;
  background: white;
`;

const App: React.FC = () => {
  return (
    <MainContainer>
      <GlobalStyles />
      <BoardContent />
    </MainContainer>
  )
};

export default App;
