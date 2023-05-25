import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import CardModal from './card-modal/CardModal';
import CardLabel from './card-label/CardLabel';
import { CardBlock, LabelsContainer } from './Card.styled';

interface CardProps {
  id: string;
  index: number;
  title: string;
  body: string;
  labels: any[];
  createdAt: Date;
  columnTitle: string;
  columnId: string;
}

const Card: React.FC<CardProps> = ({
  id,
  index,
  title,
  body,
  labels,
  createdAt,
  columnTitle,
  columnId,
}) => {
  const [cardModalVisible, setCardModalVisible] = useState(false);
  const [labelsExpanded, setLabelsExpanded] = useState(false);

  const openCardModal = () => {
    setCardModalVisible(true);
  };

  const toggleLablesExpanded = () => {
    setLabelsExpanded(!labelsExpanded);
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
          activeCardLabels={labels}
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
            <LabelsContainer
              onClick={(e) => {
                e.stopPropagation();
                toggleLablesExpanded();
              }}
            >
              <CardLabel
                isExpanded={labelsExpanded}
                title="DemoLabel"
                color="#baf3bc"
              />
              {labels.map((label) => (
                <CardLabel
                  key={label.id}
                  isExpanded={labelsExpanded}
                  title={label.title}
                  color={label.color}
                />
              ))}
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
