import { Icon } from '@iconify/react';
import { useContext } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

import { BoardIdContext } from '@/pages/board/BoardPage';
import { useReorderColumnsCallMutation } from '@/services/bff/boards.api';
import { useMoveCardMutation } from '@/services/bff/cards.api';
import { useCreateColumnMutation } from '@/services/bff/columns.api';
import { ColumnState } from '@/services/bff/types';

import Column from '../Column/Column';
import {
  ColumnContainer,
  ListContainer,
  NewColumnButton,
} from './ColumnList.styled';

interface ColumnListProps {
  columns: ColumnState[];
}

const ColumnList: React.FC<ColumnListProps> = ({ columns }) => {
  const [createColumn] = useCreateColumnMutation();
  const [reorderColumnsCall] = useReorderColumnsCallMutation();
  const [moveCardCall] = useMoveCardMutation();

  const boardId = useContext(BoardIdContext);

  const createNewColumn = async () => {
    await createColumn({
      title: 'New Column',
      boardId,
    });
  };

  const onColumnDragEnd = async (result: DropResult) => {
    const { draggableId, destination, source, type } = result;

    // check if item was not moved anywhere
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    if (type === 'column') {
      const newColumnOrder: ColumnState[] = Array.from(columns);
      const [movedColumn] = newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, movedColumn);
      const newColumnIds = newColumnOrder.map((c) => {
        return c._id;
      });
      await reorderColumnsCall({
        id: boardId,
        newColumnOrder: newColumnIds,
      });
      return;
    }

    const movePayload = {
      boardId,
      cardId: draggableId,
      source: {
        columnId: source.droppableId,
        index: source.index,
      },
      target: {
        columnId: destination.droppableId,
        index: destination.index,
      },
    };

    await moveCardCall(movePayload);
  };

  return (
    <ListContainer>
      <DragDropContext onDragEnd={onColumnDragEnd}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            <ColumnContainer
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {columns &&
                columns.map((column: ColumnState, index) => {
                  return (
                    <Column
                      key={column._id}
                      id={column._id}
                      index={index}
                      boardId={boardId}
                      title={column.title}
                      cardIds={column.cards}
                    />
                  );
                })}
              {provided.placeholder}
            </ColumnContainer>
          )}
        </Droppable>
        <NewColumnButton onClick={createNewColumn}>
          <Icon icon="uil:plus" />
          Create new column
        </NewColumnButton>
      </DragDropContext>
    </ListContainer>
  );
};

export default ColumnList;
