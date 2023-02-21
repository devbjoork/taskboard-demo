import { Icon } from '@iconify/react';
import React from 'react';
import styled from 'styled-components';
import AppButton from './ui/AppButton';

const StyledBoardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;

const BoardSection = styled.div`
  display: flex;

  button {
    margin-left: 0.5rem;
  }
`;

const BoardTitle = styled.h3`
  font-weight: bold;
  padding: 0.5rem 0.5rem;
  border-radius: 0.3rem;
  margin-right: 0.5rem;

  &:hover {
    background-color: rgba(0, 0, 0, 40%);
  }
`;

const BoardHeader: React.FC = () => {
  return (
    <StyledBoardHeader>
      <BoardSection>
        <BoardTitle>Board Title</BoardTitle>
        <AppButton>
          <Icon icon="uil:star" />
        </AppButton>
      </BoardSection>
      <BoardSection>
        <AppButton>
          <Icon icon="uil:filter" />
          Filter
        </AppButton>
        <AppButton>
          <Icon icon="uil:ellipsis-h" />
        </AppButton>
      </BoardSection>
    </StyledBoardHeader>
  );
};

export default BoardHeader;
