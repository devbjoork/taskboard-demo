import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BoardItemBlock,
  ExtraControls,
  StarredButton,
  Title,
} from './BoardItem.styled';
import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { useStarBoardMutation } from '../../../services/bff/users.api';
import { ThemePrefs } from '../../../services/bff/types';

interface BoardItemProps {
  id: string;
  title: string;
  isStarred: boolean;
  theme: ThemePrefs;
}

const BoardItem: React.FC<BoardItemProps> = ({ id, title, isStarred, theme }) => {
  const [isHovering, setIsHovering] = useState(false);
  const uid = useSelector((state: RootState) => state.userCreds.uid);
  const [starBoardMutation] = useStarBoardMutation();
  const navigate = useNavigate();

  const navigateToBoard = () => {
    navigate(`/board/${id}`);
  };

  const starBoard = () => {
    starBoardMutation({ boardId: id, action: isStarred ? 'unstar' : 'star' });
  };

  return (
    <BoardItemBlock
      onClick={navigateToBoard}
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
      theme={theme}
    >
      <Title>{title}</Title>
      {isHovering && (
        <ExtraControls onClick={(e) => e.stopPropagation()}>
          <StarredButton onClick={starBoard} active={isStarred}>
            <Icon icon="solar:star-bold" />
          </StarredButton>
        </ExtraControls>
      )}
    </BoardItemBlock>
  );
};

export default BoardItem;
