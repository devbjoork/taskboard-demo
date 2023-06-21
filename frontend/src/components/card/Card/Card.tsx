import { Icon } from '@iconify/react';
import { useContext, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';

import { BoardIdContext } from '@/pages/board/BoardPage';
import { useGetBoardByIdQuery } from '@/services/bff/boards.api';
import { setLabelsExpanded } from '@/store/preferencesSlice';
import { RootState } from '@/store/store';

import CardLabel from '../CardLabel/CardLabel';
import CardModal from '../CardModal/CardModal';
import { CardBlock, LabelsContainer } from './Card.styled';

interface CardProps {
  id: string;
  index: number;
  title: string;
  body: string;
  labels: string[];
  createdAt: Date;
  columnTitle: string;
  participants: string[];
}

const Card: React.FC<CardProps> = ({ id, index, title, body, labels, createdAt, columnTitle, participants }) => {
  const [cardModalVisible, setCardModalVisible] = useState(false);
  const dispatch = useDispatch();

  const labelsExpanded = useSelector((state: RootState) => state.preferences.labelsExpanded);

  const boardId = useContext(BoardIdContext);
  const { currentData } = useGetBoardByIdQuery(boardId);

  const openCardModal = () => {
    setCardModalVisible(true);
  };

  const displayedLabels = (currentData && currentData.labels.filter((label) => labels.includes(label._id))) || [];

  return (
    <>
      {cardModalVisible && (
        <CardModal
          id={id}
          title={title}
          body={body}
          createdAt={createdAt}
          columnTitle={columnTitle}
          activeCardLabels={displayedLabels}
          participants={participants}
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
                <CardLabel key={label._id} isExpanded={labelsExpanded} title={label.title} color={label.color} textColor={label.textColor} />
              ))}
            </LabelsContainer>
            {body && <Icon icon="uil:align-left" />}
          </CardBlock>
        )}
      </Draggable>
    </>
  );
};

export default Card;
