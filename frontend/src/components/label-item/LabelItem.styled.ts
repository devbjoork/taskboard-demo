import styled from 'styled-components';

export const LabelContainer = styled.div`
  margin-top: 0.2rem;
  display: flex;
  column-gap: 0.5rem;
`;

export const LabelBlock = styled.div`
  /* display: flex; */
  /* justify-content: space-between; */
  background-color: ${(props) => props.color || '#333'};
  border-radius: 0.25rem;
  flex: 1;
  /* padding: 0.1rem 0.5rem; */
  min-height: 1.5rem;
  color: #fff;
`;