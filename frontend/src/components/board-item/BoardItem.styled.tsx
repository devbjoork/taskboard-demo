import styled from 'styled-components';

export const BoardItemBlock = styled.div`
  display: flex;
  width: 200px;
  background-color: #fefefe;
  border: 1px solid #eee;
  border-radius: 0.25rem;
  padding: 0.5rem;
  min-height: 80px;
  min-width: 140px;
  margin-right: 1rem;
  margin-bottom: 1rem;

  &:hover {
    background-color: #f9f9f9;
  }
`;
