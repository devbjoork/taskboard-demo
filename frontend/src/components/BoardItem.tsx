import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const BoardItemBlock = styled.div`
  display: flex;
  width: 200px;
  background-color: #fefefe;
  border: 1px solid #eee;
  border-radius: 0.25rem;
  padding: 0.5rem;
  min-height: 80px;
  min-width: 140px;
  margin-right: 1rem;
  margin-bottom: 1rem;

  &:hover {
    background-color: #ddd;
  }
`;

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
