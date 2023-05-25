import styled from 'styled-components';

export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  min-width: 250px;
  max-width: 250px;
  background-color: #fbfbfb;
  padding: 1rem;
  margin-left: 1rem;
  border-radius: 0.25rem;
  box-shadow: 0 1px 0 #b1b1b1;
`;

export const ColumnHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  padding-left: 0.5rem;

  input {
    border: 2px solid #62b6ff;
    border-radius: 0.25rem;
    height: 21px;
    padding-left: 0.5rem;
  }
`;

export const ColumnButtons = styled.div`
  display: flex;
`;

export const NewCardButton = styled.button`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  padding: 0.3rem 1rem;
  line-height: 2rem;
  border: none;
  border-radius: 0.25rem;
  background-color: #f5f5f5;

  &:hover {
    background-color: #e7e7e7;
  }

  svg {
    height: 17px;
    margin-right: 0.25rem;
  }
`;

interface StyledColumnContentProps {
  isDraggingOver: boolean;
}

export const ColumnContent = styled.div<StyledColumnContentProps>`
  min-height: 1px;
  /* background-color: ${(props) =>
    props.isDraggingOver ? 'skyblue' : 'none'}; */
`;
