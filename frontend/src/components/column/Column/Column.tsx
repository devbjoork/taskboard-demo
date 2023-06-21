import { Icon } from '@iconify/react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import Card from '@/components/card/Card/Card';
import AppEditableTitle from '@/components/common/AppEditableTitle';
import { useGetBoardByIdQuery } from '@/services/bff/boards.api';
import { useCreateCardMutation } from '@/services/bff/cards.api';
import { useChangeColumnTitleMutation, useDeleteColumnMutation } from '@/services/bff/columns.api';

import ColumnMenu from '../ColumnMenu/ColumnMenu';
import { ColumnButtons, ColumnContainer, ColumnContent, ColumnHeader, NewCardButton } from './Column.styled';

interface ColumnProps {
  id: string;
  boardId: string;
  index: number;
  title: string;
  cardIds: string[];
}

const Column: React.FC<ColumnProps> = ({ id, boardId, index, title, cardIds }) => {
  const [deleteMutation] = useDeleteColumnMutation();
  const [changeTitle] = useChangeColumnTitleMutation();
  const [createCard] = useCreateCardMutation();
  const { currentData } = useGetBoardByIdQuery(boardId);

  const columnCards = (currentData && currentData.cards.filter((c) => cardIds.includes(c._id))) || [];

  const sortedCards = columnCards.sort((a, b) => cardIds.indexOf(a._id) - cardIds.indexOf(b._id));

  const createEmptyCard = async () => {
    createCard({
      title: 'New card',
      columnId: id,
      boardId: boardId,
    });
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <ColumnContainer {...provided.draggableProps} ref={provided.innerRef}>
          <ColumnHeader {...provided.dragHandleProps}>
            <AppEditableTitle initialValue={title} handleSubmit={(title: string) => changeTitle({ id, title })} />
            <ColumnMenu deleteHandler={() => deleteMutation(id)} createHandler={createEmptyCard} />
          </ColumnHeader>
          <Droppable droppableId={id} type="card">
            {(provided, snapshot) => (
              <ColumnContent ref={provided.innerRef} {...provided.droppableProps} isDraggingOver={snapshot.isDraggingOver}>
                {sortedCards.map((card, index) => (
                  <Card
                    key={card._id}
                    id={card._id}
                    index={index}
                    title={card.title}
                    body={card.body}
                    labels={card.labels}
                    createdAt={card.createdAt}
                    columnTitle={title}
                    participants={card.assignee}
                  />
                ))}
                {provided.placeholder}
              </ColumnContent>
            )}
          </Droppable>
          <ColumnButtons>
            <NewCardButton onClick={createEmptyCard}>
              <Icon icon="uil:plus" style={{ fontSize: '16px' }} />
              Add a card
            </NewCardButton>
          </ColumnButtons>
        </ColumnContainer>
      )}
    </Draggable>
  );
};

export default Column;
