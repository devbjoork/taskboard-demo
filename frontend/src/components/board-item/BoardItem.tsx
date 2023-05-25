import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BoardItemBlock } from './BoardItem.styled';

const BoardItem: React.FC<any> = ({ id, title }) => {
  const navigate = useNavigate();

  const navigateToBoard = () => {
    navigate(`/board/${id}`);
  };

  return (
    <BoardItemBlock onClick={navigateToBoard}>
      <div>{title}</div>
    </BoardItemBlock>
  );
};

export default BoardItem;
