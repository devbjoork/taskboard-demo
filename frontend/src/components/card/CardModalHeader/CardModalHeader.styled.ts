import styled from 'styled-components';

export const HeaderContainer = styled.div`
  display: flex;
  column-gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #ddd;

  input {
    border: 2px solid #62b6ff;
    border-radius: 0.25rem;
    height: 2rem;
    padding-left: 0.5rem;

    transition: all 76ms ease-in-out;

    &:focus {
      outline: none;
    }
  }
`;

export const CloseButton = styled.button`
  display: flex;
  align-self: center;
  background: none;
  border: none;

  svg {
    color: grey;
  }
`;
