import { Label } from './CardLabel.styled';

interface CardLabelProps {
  title?: string;
  isExpanded: boolean;
  color: string;
  textColor: string;
}

const CardLabel: React.FC<CardLabelProps> = ({ title = '', isExpanded, color, textColor }) => {
  return (
    <Label color={color} textColor={textColor} expanded={isExpanded}>
      {isExpanded && title}
    </Label>
  );
};

export default CardLabel;
