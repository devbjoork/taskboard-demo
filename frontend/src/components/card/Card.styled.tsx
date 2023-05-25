import styled from 'styled-components';

interface StyledCardBlockProps {
  isDragging: boolean;
}

export const CardBlock = styled.div<StyledCardBlockProps>`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  background-color: #fff;
  margin: 0.5rem 0;
  border-radius: 3px;
  box-shadow: 0 1px 0 #b1b1b1;
  transform: rotate(0deg);

  /* does not work, overrides dnd values */
  ${(props) =>
    props.isDragging &&
    `
    transform: rotate(3deg); 
  `}
`;

export const LabelsContainer = styled.div`
  display: flex;
  max-width: 100%;
  flex-wrap: wrap;
  gap: 0.1rem;
  margin: 0.3rem 0;
`;
