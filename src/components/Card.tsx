import React from 'react';
import styled from 'styled-components';

const CardBlock = styled.div`
  padding: 0.5rem;
  background: #f1f1f1;
  margin: 0.5rem 0;
  border-radius: 3px;
  box-shadow: 0 1px 0 #b1b1b1;
`;

interface CardProps {
  title: string;
  onDragStart: (e: any, card: any) => void;
}

const Card: React.FC<CardProps> = ({ title, onDragStart }) => {
  const handleDragEnd = (e: any) => {
    e.target.style.boxShadow = 'none';
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    e.target.style.boxShadow = '0 4px 3px gray';
  };

  const handleDragLeave = (e: any) => {
    e.target.style.boxShadow = 'none';
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
  };

  return (
    <CardBlock
      draggable="true"
      onDragStart={(e) => onDragStart(e, this)}
      onDragEnd={(e) => handleDragEnd(e)}
      onDragOver={(e) => handleDragOver(e)}
      onDragLeave={(e) => handleDragLeave(e)}
      onDrop={(e) => handleDrop(e)}
    >
      {title}
    </CardBlock>
  );
};

export default Card;
