import React from 'react';
import styled from 'styled-components';

const CardBlock = styled.div`
  padding: 0.5rem;
  background: #f1f1f1;
  margin: .5rem 0;
  border-radius: 3px;
  box-shadow: 0 1px 0 #b1b1b1;
`;

interface CardProps {
  title: string;
};

const Card: React.FC<CardProps> = ({title}) => {
  return (
    <CardBlock draggable='true'>{title}</CardBlock>
  )
};

export default Card;