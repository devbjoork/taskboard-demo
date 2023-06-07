import {
  BoardsContainer,
  DashboardContainer,
  DashboardMenu,
  MenuButton,
} from './DashboardPage.styled';
import BoardList from '../../components/board/BoardList/BoardList';
import { Icon } from '@iconify/react';
import { useFilteredBoards } from './hooks/useFilteredBoards';

const DashboardPage: React.FC = () => {
  const { ownedBoards, sharedBoards, starredBoards } = useFilteredBoards();

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
