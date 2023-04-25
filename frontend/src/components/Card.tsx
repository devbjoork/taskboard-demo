import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import CardModal from './CardModal';

const CardBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  background-color: #fff;
  /* background: ${props => (props.isDragging ? 'lightgreen' : '#fff')}; */
  /* transform: ${props => (props.isDragging ? 'rotate(20)' : 'rotate(0)')}; */
  margin: 0.5rem 0;
  border-radius: 3px;
  box-shadow: 0 1px 0 #b1b1b1;
`;

const LabelsContainer = styled.div`
  display: flex;
  max-width: 100%;
  flex-wrap: wrap;
  margin: 0.3rem 0;
`;

const CardLabel = styled.div`
  background-color: #62ffc5;
  color: #fff;
  border-radius: 1rem;
  padding: 0.2rem 0.55rem;
  margin-left: 0.25rem;
  margin-bottom: 0.2rem;
  font-size: 0.75rem;
  font-weight: bold;
`;

interface CardProps {
  id: string;
  index: number;
  title: string;
  body: string;
  createdAt: Date;
  columnTitle: string;
  columnId: string;
  onDragStart: (e: any, card: any) => void;
}

const Card: React.FC<CardProps> = ({
  id,
  index,
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
      <Draggable draggableId={id} index={index}>
        {(provided, snapshot) => (
          <CardBlock
            onClick={openCardModal}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            {title}
            <LabelsContainer>
              <CardLabel></CardLabel>
              <CardLabel></CardLabel>
              <CardLabel></CardLabel>
              <CardLabel></CardLabel>
              <CardLabel></CardLabel>
              <CardLabel></CardLabel>
              <CardLabel></CardLabel>
              <CardLabel></CardLabel>
              <CardLabel></CardLabel>
              <CardLabel>FEAT</CardLabel>
              <CardLabel>FEAT MVP</CardLabel>
              {/* Sort so first are empty, and put non-empty on next row */}
            </LabelsContainer>
            {body && <Icon icon="uil:align-left" />}
          </CardBlock>
        )}
      </Draggable>
    </>
  );
};

export default Card;
