import React, { useState } from 'react';
import Card from '../../card/Card';
import { Icon } from '@iconify/react';
import ColumnMenu from '../column-menu/ColumnMenu';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import AppEditableTitle from '../../common/AppEditableTitle';
import {
  ColumnButtons,
  ColumnContainer,
  ColumnContent,
  ColumnHeader,
  NewCardButton,
} from './Column.styled';
import { useCreateCardMutation } from '../../../services/bff/cards.api';
import { useDeleteColumnMutation, useChangeColumnTitleMutation } from '../../../services/bff/columns.api';

interface ColumnProps {
  id: string;
  boardId: string;
  index: number;
  title: string;
  items: any[];
}

const Column: React.FC<ColumnProps> = ({
  id,
  boardId,
  index,
  title,
  items,
}) => {
  const [columnTitle, setColumnTItle] = useState(title);
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
          <ColumnHeader
            {...provided.dragHandleProps}
            // onClick={(e) => e.stopPropagation()} // dunno if thats still needed
          >
            <AppEditableTitle
              initialValue={columnTitle}
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
                {items.map((item, index) => (
                  <Card
                    key={item._id}
                    id={item._id}
                    index={index}
                    title={item.title}
                    body={item.body}
                    labels={item.labels}
                    createdAt={item.createdAt}
                    columnTitle={columnTitle}
                    columnId={id}
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
