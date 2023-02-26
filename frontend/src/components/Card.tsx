import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import styled from 'styled-components';
import CardModal from './CardModal';

const CardBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  background: #fff;
  margin: 0.5rem 0;
  border-radius: 3px;
  box-shadow: 0 1px 0 #b1b1b1;
`;

interface CardProps {
  id: string;
  title: string;
  body: string;
  createdAt: Date;
  columnTitle: string;
  columnId: string;
  onDragStart: (e: any, card: any) => void;
}

const Card: React.FC<CardProps> = ({
  id,
  title,
  body,
  createdAt,
  columnTitle,
  columnId,
  onDragStart,
}) => {
  const [cardModalVisible, setCardModalVisible] = useState(false);

  const openCardModal = () => {
    setCardModalVisible(true);
  };

  return (
    <>
      {cardModalVisible && (
        <CardModal 
          id={id}
          title={title}
          body={body}
          createdAt={createdAt}
          columnTitle={columnTitle}
          columnId={columnId}
          handleClose={() => setCardModalVisible(false)} 
        />
      )}
      <CardBlock onClick={openCardModal} draggable="true">
        {title}
        { body &&
          <Icon icon="uil:align-left" />
        }
      </CardBlock>
    </>
  );
};

export default Card;
