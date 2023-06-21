import { Icon } from '@iconify/react';
import { useContext } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import AppEditableTitle from '@/components/common/AppEditableTitle';
import CompactUserList from '@/components/CompactUserList/CompactUserList';
import { BoardIdContext } from '@/pages/board/BoardPage';
import { useDeleteBoardMutation, useGetBoardByIdQuery, useUpdateBoardMutation } from '@/services/bff/boards.api';
import { UserData } from '@/services/bff/types';

import ShareBoardButton from '../ShareBoardButton/ShareBoardButton';
import { ButtonOptions, DeleteBoardButton, HeadingContainer, HeadingSection } from './BoardHeading.styled';

interface BoardHeadingProps {
  title: string;
  userData: UserData[];
}

const BoardHeading: React.FC<BoardHeadingProps> = ({ title, userData = [] }) => {
  const navigate: NavigateFunction = useNavigate();
  const boardId = useContext(BoardIdContext);

  const { currentData } = useGetBoardByIdQuery(boardId);
  const [updateBoard] = useUpdateBoardMutation();
  const [deleteBoard] = useDeleteBoardMutation();

  const saveTitle = async (newValue: string) => {
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
