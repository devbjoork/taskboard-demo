import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import styled from 'styled-components';
import Column from './Column';
import AppButton from './ui/AppButton';

const Content = styled.div`
  display: flex;
`;

const NewContent = styled.div`
  display: flex;
  margin-left: 1rem;
  align-items: flex-start;
  
  button {
    padding: 1rem;
    background-color: rgba(255,255,255, 0.5) !important;
    color: black;
    font-size: 1rem;

    &:focus {
      background-color: rgba(187, 187, 187, 0.5) !important;
    }
  }
`;

const BoardContent: React.FC = () => {
  const [columns, setColumns] = useState([
    { id: 1, title: 'Todo', items: [{ id: 1, title: 'Card 1' }, { id: 2, title: 'Card 2' }, { id: 3, title: 'Card 3' } ] },
    { id: 2, title: 'In Progress', items: [{ id: 4, title: 'Card 4' }, { id: 5, title: 'Card 5' }, { id: 6, title: 'Card 6' } ] },
    { id: 3, title: 'Finished', items: [{ id: 7, title: 'Card 7' }, { id: 8, title: 'Card 8' }, { id: 9, title: 'Card 9' } ] }
  ]);
  
  return (
    <Content>
      { columns.map(column => 
        <Column title={column.title} items={column.items} />
      )}
      <NewContent>
        <AppButton><Icon icon='uil:plus'/>Add one more column</AppButton>
      </NewContent>
    </Content>
  )
};

export default BoardContent;