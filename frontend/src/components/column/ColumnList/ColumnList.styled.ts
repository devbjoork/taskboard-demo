import styled from 'styled-components';

export const ListContainer = styled.div`
  display: flex;
`;

export const ColumnContainer = styled.div`
  display: flex;
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
