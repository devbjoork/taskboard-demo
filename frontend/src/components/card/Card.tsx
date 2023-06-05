import { Icon } from '@iconify/react';
import React, { useContext, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import CardModal from './card-modal/CardModal';
import CardLabel from './card-label/CardLabel';
import { CardBlock, LabelsContainer } from './Card.styled';
import { useGetBoardByIdQuery } from '../../services/bff/boards.api';
import { BoardIdContext } from '../../pages/board/BoardPage';

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

  const boardId = useContext(BoardIdContext);
  const { currentData, isFetching } = useGetBoardByIdQuery(boardId);

  const openCardModal = () => {
    setCardModalVisible(true);
  };

  const toggleLablesExpanded = () => {
    setLabelsExpanded(!labelsExpanded);
  };

  
  let displayedLabels = currentData && currentData.labels.filter((label) => labels.includes(label._id)) || [];

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
          activeCardLabels={displayedLabels}
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
              {/* <CardLabel
                isExpanded={labelsExpanded}
                title="DemoLabel"
                color="#baf3bc"
              /> */}
              {displayedLabels.map((label) => (
                <CardLabel
                  key={label._id}
                  isExpanded={labelsExpanded}
                  title={label.title}
                  color={label.color}
                  textColor={label.textColor}
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
