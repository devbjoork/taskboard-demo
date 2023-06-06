import styled from "styled-components";

export const ListContainer = styled.main`
  /* display: flex;
  flex-wrap: wrap;
  margin: 1rem; */
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

export const BoardsHeading = styled.h3`
  text-transform: uppercase;
  padding-top: 1rem;
  margin-bottom: 1rem;
  /* padding-left: 1rem; */
  color: #fff;
`;

export const NewBoardButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  height: 80px;
  min-width: 200px;
  margin-right: 1rem;
  margin-bottom: 1rem;
  border: none;
  border-radius: 0.25rem;
  background-color: rgba(255, 255, 255, 0.6);

  &:hover {
    transition: all 76ms ease-in-out;
    background-color: #f9f9f9;
  }
`;
