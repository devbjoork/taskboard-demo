import React from 'react';
import styled from 'styled-components';
import BoardContent from './BoardContent';
import BoardHeader from './BoardHeader';

const StyledBoard = styled.main`
  background-image: url('https://images.unsplash.com/photo-1542438408-abb260104ef3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1935&q=80');
  min-height: 850px;
`;

const Board: React.FC = () => {
  return (
    <StyledBoard>
      <BoardHeader />
      <BoardContent />
    </StyledBoard>
  );
};

export default Board;
