import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Icon } from '@iconify/react';
import Card from '../../card/Card/Card';
import {
  ColumnButtons,
  ColumnContainer,
  ColumnContent,
  ColumnHeader,
  NewCardButton,
} from './Column.styled';
import AppEditableTitle from '../../common/AppEditableTitle';
import ColumnMenu from '../ColumnMenu/ColumnMenu';
import { useCreateCardMutation } from '../../../services/bff/cards.api';
import {
  useDeleteColumnMutation,
  useChangeColumnTitleMutation,
} from '../../../services/bff/columns.api';
import { CardState } from '../../../services/bff/types';

interface ColumnProps {
  id: string;
  boardId: string;
  index: number;
  title: string;
  cards: CardState[];
}

const Column: React.FC<ColumnProps> = ({
  id,
  boardId,
  index,
  title,
  cards,
}) => {
  const [deleteMutation] = useDeleteColumnMutation();
  const [changeTitle] = useChangeColumnTitleMutation();
  const [createCard] = useCreateCardMutation();

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
            <AppEditableTitle
              initialValue={title}
              handleSubmit={(title: string) => changeTitle({ id, title })}
            />
            <ColumnMenu
              deleteHandler={() => deleteMutation(id)}
              createHandler={createEmptyCard}
            />
          </ColumnHeader>
          <Droppable droppableId={id} type="card">
            {(provided, snapshot) => (
              <ColumnContent
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {cards.map((card, index) => (
                  <Card
                    key={card._id}
                    id={card._id}
                    index={index}
                    title={card.title}
                    body={card.body}
                    labels={card.labels}
                    createdAt={card.createdAt}
                    columnTitle={title}
                    columnId={id}
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
