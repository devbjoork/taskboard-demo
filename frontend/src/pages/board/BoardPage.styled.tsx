import styled from 'styled-components';

import { ThemePrefs } from '@/services/bff/types';

interface BoardContainerProps {
  theme: ThemePrefs;
}

export const BoardContainer = styled.div<BoardContainerProps>`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => (props.theme.colors ? props.theme.colors.bg : '#fff')};
  flex: 1;
  height: calc(100vh - 45px);
`;
