import styled from "styled-components";

export const BoardsContainer = styled.div`
  flex: 1;
  background-color: #62b6ff;
`;

export const BoardsHeading = styled.h3`
  text-transform: uppercase;
  padding-top: 1rem;
  padding-left: 1rem;
  color: #fff;
`;

export const BoardList = styled.main`
  display: flex;
  flex-wrap: wrap;
  margin: 1rem;
`;

export const NewBoardButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  height: 80px;
  min-width: 140px;
  border: none;
  border-radius: 0.25rem;

  &:hover {
    background-color: #ddd;
  }
`;