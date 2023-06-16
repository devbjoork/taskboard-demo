import styled from 'styled-components';
import { ThemePrefs } from '../../services/bff/types';

interface AppHeaderProps {
  theme?: ThemePrefs;
}

export const AppHeader = styled.nav<AppHeaderProps>`
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  height: 45px;
  background-color: ${(props) =>
    props.theme.colors ? props.theme.colors.bg : '#fff'};
  box-shadow: 0 1px 10px
    ${(props) => (props.theme.colors ? props.theme.colors.shadow : '#f7f7f7')};
  position: relative;
`;

export const HeaderSection = styled.div<AppHeaderProps>`
  display: flex;
  align-items: center;
  color: ${(props) => (props.theme.colors ? props.theme.colors.fg : '#000')};
  button {
    margin-left: 1rem;
  }
`;

export const AppTitle = styled.h1<AppHeaderProps>`
  font-size: large;
  margin: 0 0.5rem;
  color: ${(props) => (props.theme.colors ? props.theme.colors.fg : '#000')};

  &:hover {
    color: ${(props) =>
      props.theme.colors ? props.theme.colors.shadow : '#333'};
    cursor: pointer;
  }
`;
