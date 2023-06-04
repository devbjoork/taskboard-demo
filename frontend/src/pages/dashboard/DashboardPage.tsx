import { useEffect } from 'react';
import { BoardsContainer } from './DashboardPage.styled';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useLazyGetBoardsQuery } from '../../services/bff/boards.api';
import BoardList from '../../components/board/board-list/BoardList';

const DashboardPage: React.FC = () => {
  const token = useSelector((state: RootState) => state.userCreds.accessToken);
  const uid = useSelector((state: RootState) => state.userCreds.uid);
  const [lazyGetBoards, { data = [], isError }] = useLazyGetBoardsQuery();

  useEffect(() => {
    if (token) lazyGetBoards();
  }, [token]);

  const ownedBoards =
    data &&
    data.filter((board) => {
      return board.ownerId === uid;
    });
  const sharedBoards =
    data &&
    data.filter((board) => {
      return board.ownerId !== uid;
    });
  const starredBoards = data && data.filter((board) => {
    return board.starred === true;
  });

  if (isError) return <div>Error occured</div>;

  return (
    <BoardsContainer>
      <BoardList boards={starredBoards} title="Starred boards" />
      <BoardList boards={ownedBoards} title="Your Boards" canCreate={true} />
      <BoardList boards={sharedBoards} title="Shared Boards" />
    </BoardsContainer>
  );
};

export default DashboardPage;
