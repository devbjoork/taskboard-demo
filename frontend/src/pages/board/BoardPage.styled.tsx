import styled from 'styled-components';

export const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: #62b6ff;
  height: calc(100vh - 45px);
`;

export const BoardHeading = styled.h3`
  display: flex;
  justify-content: space-between;
  color: #fff;
  padding: 1rem;

  input {
    padding-left: 0.5rem;
  }
`;

export const HeadingSection = styled.div`
  display: flex;
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

export const ButtonShare = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-left: 1rem;
  padding: 0.25rem 1rem;
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

export const BoardContent = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;

  &::-webkit-scrollbar-track {
    margin: 1rem;
  }

  &::-webkit-scrollbar {
    height: 0.5rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 0.25rem;
  }
`;

export const ColumnContainer = styled.div`
  display: flex;
`;

export const BoardLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3rem;
  font-weight: bold;
  color: #fff;
`;

export const NewColumnButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: fit-content;
  min-width: 250px;
  margin-left: 1rem;
  padding: 1rem;
  color: #fff;
  background-color: rgba(255, 255, 255, 0.15);
  border: none;
  border-radius: 0.25rem;

  &:hover {
    background-color: rgba(255, 255, 255, 0.25);
  }

  svg {
    margin-right: 0.25rem;
    font-size: 17px;
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
