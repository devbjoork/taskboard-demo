import { useEffect } from 'react';
import {
  BoardsContainer,
  DashboardContainer,
  DashboardMenu,
  MenuButton,
} from './DashboardPage.styled';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useLazyGetBoardsQuery } from '../../services/bff/boards.api';
import BoardList from '../../components/board/board-list/BoardList';
import { Icon } from '@iconify/react';

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
  const starredBoards =
    data &&
    data.filter((board) => {
      return board.starred === true;
    });

  if (isError) return <div>Error occured</div>;

  return (
    <DashboardContainer>
      <DashboardMenu>
        <MenuButton active={true}>
          <Icon icon="fluent:board-16-filled" />
          Boards
        </MenuButton>
        <MenuButton active={false}>
          <Icon icon="lucide:book-template" />
          Templates
        </MenuButton>
        <MenuButton active={false}>
          <Icon icon="mingcute:notification-fill" />
          Notifications
        </MenuButton>
      </DashboardMenu>
      <BoardsContainer>
        <BoardList boards={starredBoards} title="Starred boards" />
        <BoardList boards={ownedBoards} title="Your Boards" canCreate={true} />
        <BoardList boards={sharedBoards} title="Shared Boards" />
      </BoardsContainer>
    </DashboardContainer>
  );
};

export default DashboardPage;
