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
  background: ${(props) => (props.active ? '#fefefe' : 'none')};
  color: ${(props) => (props.active ? '#0b0b0b' : '#fefefe')};

  &:hover {
    background-color: ${(props) =>
      props.active ? '#fefefe' : 'rgba(52, 130, 197, 0.7)'};
  }
`;
