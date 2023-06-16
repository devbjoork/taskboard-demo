import styled from 'styled-components';

export const DashboardContainer = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
`;

export const DashboardMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-top: 1rem;
`;

export const BoardsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

interface MenuButtonProps {
  active: boolean;
}

export const MenuButton = styled.button<MenuButtonProps>`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 0.25rem;
  font-weight: 600;
  min-width: 10rem;
  padding: 0.5rem;
  border: none;
  border-radius: 0.25rem;
  background: ${(props) => (props.active ? '#f7f7f7' : 'none')};
  color: ${(props) => (props.active ? '#000' : '#000')};

  &:hover {
    background-color: ${(props) => (props.active ? '#dddddd' : '#dddddd')};
  }
`;
