import React from 'react';
import styled from 'styled-components';
import Card from './Card';

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 250px;
  max-width: 250px;
  background-color: #d8d9e3;
  padding: 1rem;
  margin-left: 1rem;
  border-radius: .25rem;
`;

const ColumnHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  padding-left: 0.5rem;
`;

const ColumnButtons = styled.div`
  display: flex;
`;

const Column: React.FC = () => {
  return (
    <ColumnContainer>
      <ColumnHeader>
        <div>Column name</div>
        <button>B</button>
      </ColumnHeader>
      <div className='content'>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
      </div>
      <ColumnButtons>
        <button>+</button>
      </ColumnButtons>  
    </ColumnContainer>
  );
};

export default Column;
