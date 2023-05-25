import { useEffect, useState } from 'react';
import BoardItem from '../../components/board-item/BoardItem';
import {
  BoardList,
  BoardsContainer,
  BoardsHeading,
  NewBoardButton,
} from './DashboardPage.styled';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import NewBoardModal from '../../components/NewBoardModal';
import { useNavigate } from 'react-router-dom';
import {
  useCreateBoardMutation,
  useLazyGetBoardsQuery,
} from '../../services/bff/boards.api';

const DashboardPage: React.FC = () => {
  const [newModalVisible, setNewModalVisible] = useState(false);
  const token = useSelector((state: RootState) => state.userCreds.accessToken);
  const [lazyGetBoards, { data = [], isError }] = useLazyGetBoardsQuery();
  const [createBoard] = useCreateBoardMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) lazyGetBoards();
  }, [token]);

  const handleCreateBoard = async (createPayload: any) => {
    const res: any = await createBoard(createPayload);
    navigate(`/board/${res.data._id}`);
  };

  if (isError) return <div>Error occured</div>;

  return (
    <BoardsContainer>
      <BoardsHeading>Your Boards</BoardsHeading>
      <BoardList>
        {data.map((board: any) => {
          return (
            <BoardItem key={board._id} id={board._id} title={board.title} />
          );
        })}

        <NewBoardButton onClick={() => setNewModalVisible(true)}>
          Create board
        </NewBoardButton>

        {newModalVisible && (
          <NewBoardModal
            handleClose={() => setNewModalVisible(false)}
            handleCreate={handleCreateBoard}
          />
        )}
      </BoardList>
    </BoardsContainer>
  );
};

export default DashboardPage;
