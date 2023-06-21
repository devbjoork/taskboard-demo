import styled from 'styled-components';

import { ThemePrefs } from '@/services/bff/types';

interface BoardItemBlockProps {
  theme: ThemePrefs;
}

export const BoardItemBlock = styled.div<BoardItemBlockProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.bg};
  border: 1px solid ${(props) => props.theme.colors.shadow};
  color: ${(props) => props.theme.colors.fg};
  border-radius: 0.25rem;
  padding: 0.5rem;
  min-height: 80px;
  min-width: 140px;
  margin-right: 1rem;
  margin-bottom: 1rem;

  &:hover {
    background-color: ${(props) => props.theme.colors.shadow};
    transition: background-color 76ms linear;
  }
`;

export const Title = styled.div`
  display: flex;
  font-weight: bold;
`;

export const ExtraControls = styled.div`
  display: flex;
  justify-content: flex-end;
`;

interface StarredButtonProps {
  active: boolean;
}

export const StarredButton = styled.button<StarredButtonProps>`
  transition: all 76ms linear;
  border: none;
  color: ${(props) => (props.active ? 'gold' : '#fff')};
  border-radius: 2rem;
  background: none;

  &:hover {
    color: ${(props) => (props.active ? '#ffae00' : 'gold')};
    transition: all 76ms linear;
  }
`;
