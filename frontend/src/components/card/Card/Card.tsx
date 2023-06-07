import { Icon } from '@iconify/react';
import React, { useContext, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import CardModal from '../CardModal/CardModal';
import CardLabel from '../CardLabel/CardLabel';
import { CardBlock, LabelsContainer } from './Card.styled';
import { useGetBoardByIdQuery } from '../../../services/bff/boards.api';
import { BoardIdContext } from '../../../pages/board/BoardPage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { setLabelsExpanded } from '../../../store/preferencesSlice';

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
  const dispatch = useDispatch();

  const labelsExpanded = useSelector(
    (state: RootState) => state.preferences.labelsExpanded
  );

  const boardId = useContext(BoardIdContext);
  const { currentData, isFetching } = useGetBoardByIdQuery(boardId);

  const openCardModal = () => {
    setCardModalVisible(true);
  };

  let displayedLabels =
    (currentData &&
      currentData.labels.filter((label) => labels.includes(label._id))) ||
    [];

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
                dispatch(setLabelsExpanded(!labelsExpanded));
              }}
            >
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
