import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import {
  ButtonOptions,
  DeleteBoardButton,
  HeadingContainer,
  HeadingSection,
} from './BoardHeading.styled';
import AppEditableTitle from '../../common/AppEditableTitle';
import CompactUserList from '../../compact-user-list/CompactUserList';
import ShareBoardButton from '../share-board-button/ShareBoardButton';
import { BoardIdContext } from '../../../pages/board/BoardPage';
import {
  useDeleteBoardMutation,
  useGetBoardByIdQuery,
  useUpdateBoardMutation,
} from '../../../services/bff/boards.api';
import { UserData } from '../../../services/bff/types';

interface BoardHeadingProps {
  title: string;
  userData: UserData[];
}

const BoardHeading: React.FC<BoardHeadingProps> = ({ title, userData = [] }) => {
  const navigate: any = useNavigate();
  const boardId = useContext(BoardIdContext);

  const { currentData } = useGetBoardByIdQuery(boardId);
  const [updateBoard] = useUpdateBoardMutation();
  const [deleteBoard] = useDeleteBoardMutation();

  const saveTitle = async (newValue: any) => {
    updateBoard({ id: boardId, title: newValue });
  };

  const deleteSelf = async () => {
    await deleteBoard(boardId);
    navigate('/dashboard');
  };

  if (!currentData) return <HeadingContainer></HeadingContainer>;

  return (
    <HeadingContainer>
      <HeadingSection>
        <AppEditableTitle initialValue={title} handleSubmit={saveTitle} />
        <DeleteBoardButton onClick={deleteSelf}>
          <Icon icon="uil:trash" />
        </DeleteBoardButton>
      </HeadingSection>
      <HeadingSection>
        <CompactUserList users={userData} boardId={boardId} />
        <ShareBoardButton boardId={boardId} />
        <ButtonOptions>
          <Icon icon="ri:more-fill" />
        </ButtonOptions>
      </HeadingSection>
    </HeadingContainer>
  );
};

export default BoardHeading;
