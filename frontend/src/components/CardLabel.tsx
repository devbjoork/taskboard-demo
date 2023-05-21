import styled from 'styled-components';

const Label = styled.div`
  border-radius: 0.25rem;
  background-color: ${(props) => props.color};
  color: #fff;
  padding: 0.2rem 0.55rem;
  font-size: 0.7rem;
  font-weight: bold;
  min-width: 19%;
  /* max-width: 25%; */
  min-height: 0.5rem;
  max-height: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: all 0.5s ease-in-out;

  ${props => props.expanded && `
    max-width: 100%;
    min-height: 1.3rem;
  `}
`;

interface CardLabelProps {
  title: string;
  isExpanded: boolean;
  color: string;
}

const CardLabel: React.FC<CardLabelProps> = ({ title, isExpanded, color }) => {
  return <Label color={color} expanded={isExpanded}>{isExpanded && title}</Label>;
};

export default CardLabel;
