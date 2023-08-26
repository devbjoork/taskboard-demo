import styled from 'styled-components';

export const ToolbarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  /* width: 150%; */
`;

export const DeleteCardButton = styled.button`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 0.25rem;
  border: 1px solid #58595a;
  border-radius: 0.25rem;
  background-color: #f9f9f9;
  color: #58595a;
  padding: 0.5rem 2rem;

  :hover {
    background-color: #f1f1f1;
  }
`;
