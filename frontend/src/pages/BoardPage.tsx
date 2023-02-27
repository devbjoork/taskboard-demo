import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Column from '../components/Column';
import {
  useDeleteBoardMutation,
  useGetBoardByIdQuery,
  useUpdateBoardMutation,
} from '../services/boards.api';
import { useCreateColumnMutation } from '../services/columns.api';
import {
  addColumnToCurrent,
  removeBoardFromList,
  renameBoard,
  setCurrentBoard,
} from '../store/boardsSlice';
import { RootState } from '../store/store';

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: #62b6ff;
  height: calc(100vh - 45px);
`;

const BoardHeading = styled.h3`
  display: flex;
  color: #fff;
  padding: 1rem;

  input {
    padding-left: 0.5rem;
  }
`;

const BoardContent = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;

  &::-webkit-scrollbar-track {
    margin: 1rem;
  }

  &::-webkit-scrollbar {
    height: 0.5rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 0.25rem;
  }
`;

const BoardLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3rem;
  font-weight: bold;
  color: #fff;
`;

const NewColumnButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: fit-content;
  min-width: 250px;
  margin-left: 1rem;
  padding: 1rem;
  color: #fff;
  background-color: rgba(255, 255, 255, 0.15);
  border: none;
  border-radius: 0.25rem;

  &:hover {
    background-color: rgba(255, 255, 255, 0.25);
  }

  svg {
    margin-right: 0.25rem;
    font-size: 17px;
  }
`;

const DeleteBoardButton = styled.button`
  margin-left: 1rem;
  padding: 0.25rem;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  background-color: rgba(255, 255, 255, 0.15);
  svg {
    font-size: 17px;
  }
  &:hover {
    background-color: rgba(255, 255, 255, 0.25);
  }
`;

const BoardPage: React.FC = () => {
  const params: any = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [waitingState, setWaitingState] = useState(true);
  const [boardTitle, setBoardTItle] = useState('');
  const [isTitleEdit, setIsTitleEdit] = useState(false);
  const { data } = useGetBoardByIdQuery(params.boardId, {
    skip: waitingState,
  });
  const [createColumn] = useCreateColumnMutation();
  const [updateBoard] = useUpdateBoardMutation();
  const [deleteBoard] = useDeleteBoardMutation();

  const token = useSelector((state: RootState) => state.userCreds.accessToken);
  const currentBoard = useSelector(
    (state: RootState) => state.boards.currentBoard
  );

  useEffect(() => {
    if (token) setWaitingState(false);
    else setWaitingState(true);
  }, [token]);

  useEffect(() => {
    if (data) {
      dispatch(setCurrentBoard(data));
      setBoardTItle(data.title);
    }
  }, [data]);

  const createNewColumn = async () => {
    const column: any = await createColumn({
      title: 'New Column',
      boardId: currentBoard._id,
    });
    if (column.data) {
      const { _id, title, boardId, tasks } = column.data;
      dispatch(addColumnToCurrent({ _id, title, boardId, tasks }));
    }
  };

  const deleteSelf = async () => {
    await deleteBoard(currentBoard._id);
    dispatch(removeBoardFromList(currentBoard._id));
    navigate('/dashboard');
  };

  const handleClickOutside = async (e: any) => {
    if (!isTitleEdit) return;
    const node = ReactDOM.findDOMNode(this);
    if (!node || !node.contains(e.target)) {
      setIsTitleEdit(false);
      await updateBoard({ id: currentBoard._id, title: boardTitle });
      dispatch(renameBoard(boardTitle));
    }
  };

  if (waitingState)
    return (
      <BoardContainer>
        <BoardLoading>Loading</BoardLoading>
      </BoardContainer>
    );

  return (
    <BoardContainer
      onClick={(e) => {
        handleClickOutside(e);
      }}
    >
      <BoardHeading>
        {isTitleEdit ? (
          <input
            type="text"
            value={boardTitle}
            onChange={(e) => setBoardTItle(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <div onClick={() => setIsTitleEdit(true)}>{boardTitle}</div>
        )}
        <DeleteBoardButton onClick={deleteSelf}>
          <Icon icon="uil:trash" />
        </DeleteBoardButton>
      </BoardHeading>
      <BoardContent>
        {currentBoard.columns.map((column: any) => {
          return (
            <Column
              id={column._id}
              title={column.title}
              items={column.tasks}
              key={column._id}
            />
          );
        })}
        <NewColumnButton onClick={createNewColumn}>
          <Icon icon="uil:plus" />
          Create new column
        </NewColumnButton>
      </BoardContent>
    </BoardContainer>
  );
};

export default BoardPage;
