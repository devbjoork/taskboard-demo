import React from 'react';
import styled from 'styled-components';
import Card from './Card';
import { Icon } from '@iconify/react';
import AppButton from './ui/AppButton';

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 250px;
  max-width: 250px;
  background-color: #d8d9e3;
  padding: 1rem;
  margin-left: 1rem;
  border-radius: 0.25rem;
  box-shadow: 0 1px 0 #b1b1b1;
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

interface ColumnProps {
  title: string;
  items: CardProps[];
}

interface CardProps {
  id: number;
  title: string;
}

const Column: React.FC<ColumnProps> = ({ title, items }) => {
  const handleDragStart = (e: any, card: any) => {
    console.log(e);
  };

  const handleDragEnd = (e: any) => {};

  const handleDragOver = (e: any, column: ColumnProps, card: CardProps) => {};

  const handleDragLeave = (e: any) => {};

  const handleDrop = (e: any) => {};

  return (
    <ColumnContainer
      draggable="true"
    >
      <ColumnHeader>
        <div>{title}</div>
        <button style={{ border: 'none', background: 'none' }}>
          <Icon icon="uil:ellipsis-h" style={{ fontSize: '16px' }} />
        </button>
      </ColumnHeader>
      <div className="content">
        {items.map((item) => (
          <Card
            title={item.title}
            key={item.id}
            onDragStart={handleDragStart}
          />
        ))}
      </div>
      <ColumnButtons>
        <AppButton isTransparent>
          <Icon icon="uil:plus" style={{ fontSize: '16px' }} />
          Add a card
        </AppButton>
      </ColumnButtons>
    </ColumnContainer>
  );
};

export default Column;
