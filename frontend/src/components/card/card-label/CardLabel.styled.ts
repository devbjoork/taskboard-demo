import styled from 'styled-components';

interface StyledLabelProps {
  expanded: boolean;
  color: string;
  textColor: string;
}

export const Label = styled.div<StyledLabelProps>`
  border-radius: 0.25rem;
  background-color: ${(props) => props.color};
  color: ${(props) => props.textColor ? props.textColor : '#fff'};
  padding: 0.2rem 0.55rem;
  font-size: 0.7rem;
  font-weight: bold;
  min-width: 19%;
  min-height: 0.5rem;
  max-height: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: all 0.5s ease-in-out;

  ${(props) =>
    props.expanded &&
    `
    max-width: 100%;
    min-height: 1.3rem;
  `}
`;
