import styled from 'styled-components';

export const UserButton = styled.button`
  display: flex;
  border: 3px solid rgba(255, 255, 255, 0.01);
  border-radius: 2rem;

  &:hover {
    border: 3px solid rgba(255, 255, 255, 1);
  }

  img {
    border-radius: 1rem;
  }
`;
