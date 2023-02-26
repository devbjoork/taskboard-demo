import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BoardItem from '../components/BoardItem';
import NewBoardModal from '../components/NewBoardModal';
import {
  useCreateBoardMutation,
  useLazyGetBoardsQuery,
} from '../services/boards.api';
import { addBoards } from '../store/boardsSlice';
import { RootState } from '../store/store';

const BoardsContainer = styled.div`
  flex: 1;
  background-color: #62b6ff;
`;

const BoardsHeading = styled.h3`
  text-transform: uppercase;
  /* margin: 1rem; */
  padding-top: 1rem;
  padding-left: 1rem;
  color: #fff;
`;

const BoardList = styled.main`
  display: flex;
  flex-wrap: wrap;
  margin: 1rem;
`;

const NewBoardButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  height: 80px;
  min-width: 140px;
  border: none;
  border-radius: 0.25rem;

  &:hover {
    background-color: #ddd;
  }
`;

const DashboardPage: React.FC = () => {
  const token = useSelector((state: RootState) => state.userCreds.accessToken);
  const boards = useSelector((state: RootState) => state.boards.boards);
  const dispatch = useDispatch();
  const [lazyGetBoards, boardResult] = useLazyGetBoardsQuery();
  const [createBoard] = useCreateBoardMutation();
  const navigate = useNavigate();

  const [newModalVisible, setNewModalVisible] = useState(false);

  useEffect(() => {
    if (token) lazyGetBoards();
  }, [token]);

  useEffect(() => {
    if (boardResult.isSuccess) dispatch(addBoards(boardResult.data));
  }, [boardResult]);

  const handleCloseModal = () => {
    setNewModalVisible(false);
  };

  const handleCreateBoard = async (createPayload: any) => {
    const res = await createBoard(createPayload);
    setNewModalVisible(false);
    navigate(`/board/${res.data._id}`);
  };

  return (
    <BoardsContainer>
      <BoardsHeading>Your boards</BoardsHeading>
      <BoardList>
        {boards.map((board: any) => {
          return (
            <BoardItem key={board._id} id={board._id} title={board.title} />
          );
        })}
        <NewBoardButton onClick={() => setNewModalVisible(true)}>
          Create board
        </NewBoardButton>
        {newModalVisible ? (
          <NewBoardModal
            handleClose={handleCloseModal}
            handleCreate={handleCreateBoard}
          />
        ) : (
          <></>
        )}
      </BoardList>
    </BoardsContainer>
  );
};

export default DashboardPage;
