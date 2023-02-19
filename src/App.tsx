import React from 'react';
import styled from 'styled-components';

const MainContainer = styled.main`
  padding: 3em;
  background: violet;
`;

const App: React.FC = () => {
  return (
    <MainContainer>
      Main Container Styled
    </MainContainer>
  )
};

export default App;
