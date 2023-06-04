import { useEffect, useState } from 'react';
import {
  BoardContainer,
  BoardContent,
  BoardHeading,
  ButtonOptions,
  ButtonShare,
  ColumnContainer,
  DeleteBoardButton,
  HeadingSection,
  NewColumnButton,
} from './BoardPage.styled';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useNavigate, useParams } from 'react-router-dom';
import AppEditableTitle from '../../components/common/AppEditableTitle';
import { Icon } from '@iconify/react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Column from '../../components/column/Column';
import {
  useLazyGetBoardByIdQuery,
  useUpdateBoardMutation,
  useDeleteBoardMutation,
  useReorderColumnsCallMutation,
} from '../../services/bff/boards.api';
import { useMoveCardMutation } from '../../services/bff/cards.api';
import { useCreateColumnMutation } from '../../services/bff/columns.api';
import CompactUserList from '../../components/CompactUserList';
import ShareBoardButton from '../../components/ShareBoardButton';

const BoardPage: React.FC = () => {
  const params: any = useParams();
  const navigate: any = useNavigate();
  const [boardTitle, setBoardTItle] = useState('');
  const [lazyGetBoard, { data, isLoading, isSuccess, isFetching }] =
    useLazyGetBoardByIdQuery();
  const [updateBoard] = useUpdateBoardMutation();
  const [deleteBoard] = useDeleteBoardMutation();
  const [createColumn] = useCreateColumnMutation();
  const [reorderColumnsCall] = useReorderColumnsCallMutation();
  const [moveCardCall] = useMoveCardMutation();
  const token = useSelector((state: RootState) => state.userCreds.accessToken);

  useEffect(() => {
    if (token) lazyGetBoard(params.boardId);
  }, [token]);

  useEffect(() => {
    if (data) {
      setBoardTItle(data.title);
    }
  }, [data]);

  const saveTitle = async (newValue: any) => {
    if (data) await updateBoard({ id: data._id, title: newValue });
  };

  const deleteSelf = async () => {
    if (data) {
      await deleteBoard(data._id);
      navigate('/dashboard');
    }
  };

  const onColumnDragEnd = async (result: any) => {
    const { draggableId, destination, source, type } = result;
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    if (type === 'column') {
      if (data) {
        const newColumnOrder: any[] = Array.from(data.columns);
        const [movedColumn] = newColumnOrder.splice(source.index, 1);
        newColumnOrder.splice(destination.index, 0, movedColumn);
        const newColumnIds = newColumnOrder.map((c) => {
          return c._id;
        });

        await reorderColumnsCall({
          id: data._id,
          newColumnOrder: newColumnIds,
        });
        return;
      }
    }

    const movePayload = {
      boardId: (data && data._id) || '',
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

    // is there a need to handle result of move or just repeat same action with state
    await moveCardCall(movePayload);
  };

  const createNewColumn = async () => {
    if (data) {
      const column: any = await createColumn({
        title: 'New Column',
        boardId: data._id,
      });
    }
  };

  if (isFetching)
    return (
      <BoardContainer>
        <BoardHeading>Loading...</BoardHeading>
      </BoardContainer>
    );
  else
    return (
      <BoardContainer>
        <BoardHeading>
          <HeadingSection>
            <AppEditableTitle
              initialValue={boardTitle}
              handleSubmit={saveTitle}
            />
            <DeleteBoardButton onClick={deleteSelf}>
              <Icon icon="uil:trash" />
            </DeleteBoardButton>
          </HeadingSection>
          <HeadingSection>
            <CompactUserList users={data?.userData} boardId={data?._id} />
            <ShareBoardButton boardId={data?._id} />
            <ButtonOptions>
              <Icon icon="ri:more-fill" />
            </ButtonOptions>
          </HeadingSection>
        </BoardHeading>
        <BoardContent>
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
                  {data?.columns.map((column: any, index: any) => {
                    return (
                      <Column
                        id={column._id}
                        boardId={data._id}
                        index={index}
                        title={column.title}
                        items={column.tasks}
                        key={column._id}
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
        </BoardContent>
      </BoardContainer>
    );
};

export default BoardPage;
