import styled from 'styled-components';

export const HeadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  color: #fff;
  padding: 1rem;
`;

export const HeadingSection = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 1.2rem;
  min-height: 2rem;
  max-height: 2rem;

  input {
    border: 2px solid #62b6ff;
    border-radius: 0.25rem;
    min-height: 2rem;
    /* width: 30rem; */
    padding-left: 0.5rem;

    transition: all 76ms ease-in-out;

    &:focus {
      outline: none;
    }
  }
`;

export const DeleteBoardButton = styled.button`
  margin-left: 1rem;
  padding: 0.25rem;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  background-color: rgba(255, 255, 255, 0.15);
  svg {
    font-size: 17px;
  }
  &:hover {
    background-color: rgba(255, 255, 255, 0.25);
  }
`;

export const ButtonOptions = styled.button`
  margin-left: 1rem;
  padding: 0.25rem;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  background-color: rgba(255, 255, 255, 0.15);
  svg {
    font-size: 17px;
  }
  &:hover {
    background-color: rgba(255, 255, 255, 0.25);
  }
`;
