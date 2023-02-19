import React from 'react';
import styled from 'styled-components';
import Column from './Column';

const Content = styled.div`
  display: flex;
`;

const BoardContent: React.FC = () => {
  return (
    <Content>
      <Column />
      <Column />
      <Column />
    </Content>
  )
};

export default BoardContent;