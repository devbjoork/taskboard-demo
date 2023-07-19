import styled from 'styled-components';

export const ActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  padding-bottom: 2rem;
`;

export const ActionsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 1.2rem;
`;

export const HeaderGroup = styled.div`
  display: flex;
  column-gap: 1rem;
  align-items: center;
`;

export const DetailsButton = styled.button`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 0.25rem;
  border: 1px solid #58595a;
  border-radius: 0.25rem;
  background-color: #f9f9f9;
  color: #58595a;
  padding: 0.5rem 1rem;

  :hover {
    background-color: #f1f1f1;
  }
`;
