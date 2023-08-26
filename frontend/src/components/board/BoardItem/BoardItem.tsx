import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ThemePrefs } from '@/services/bff/types';
import { useStarBoardMutation } from '@/services/bff/users.api';

import {
  BoardItemBlock,
  ExtraControls,
  StarredButton,
  Title,
} from './BoardItem.styled';

interface BoardItemProps {
  id: string;
  title: string;
  isStarred: boolean;
  theme: ThemePrefs;
}

const BoardItem: React.FC<BoardItemProps> = ({
  id,
  title,
  isStarred,
  theme,
}) => {
  const [isHovering, setIsHovering] = useState(false);
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
      data-testid="boardItem"
      theme={theme}
      onClick={navigateToBoard}
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
    >
      <Title>{title}</Title>
      {isHovering && (
        <ExtraControls onClick={(e) => e.stopPropagation()}>
          <StarredButton active={isStarred} onClick={starBoard}>
            <Icon icon="solar:star-bold" />
          </StarredButton>
        </ExtraControls>
      )}
    </BoardItemBlock>
  );
};

export default BoardItem;
