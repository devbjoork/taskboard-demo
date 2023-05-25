import { Label } from './CardLabel.styled';

interface CardLabelProps {
  title: string;
  isExpanded: boolean;
  color: string;
}

const CardLabel: React.FC<CardLabelProps> = ({ title, isExpanded, color }) => {
  return (
    <Label color={color} expanded={isExpanded}>
      {isExpanded && title}
    </Label>
  );
};

export default CardLabel;
