import { useState } from 'react';
import { LabelContainer, LabelBlock, LabelCheckBox } from './LabelItem.styled';
import EditLabelButton from '../card/EditLabelButton/EditLabelButton';
import {
  useAddLabelMutation,
  useRemoveLabelMutation,
} from '../../services/bff/cards.api';

interface LabelItemProps {
  id: string;
  boardId: string;
  cardId: string;
  columnId: string;
  color: string;
  textColor: string,
  name: string;
  title?: string;
  active: boolean;
}

const LabelItem: React.FC<LabelItemProps> = ({
  id,
  color,
  textColor,
  title,
  name,
  boardId,
  columnId,
  cardId,
  active,
}) => {
  const [isActive, setIsActive] = useState(active);

  const [addLabel] = useAddLabelMutation();
  const [removeLabel] = useRemoveLabelMutation();

  const toggleActive = async () => {
    const activated = !isActive;
    setIsActive(activated);
    const payload = {
      boardId: boardId,
      cardId: cardId,
      columnId: columnId,
      labelId: id,
    };
    if (activated) {
      await addLabel(payload);
    } else {
      await removeLabel(payload);
    }
  };

  console.log(textColor);
  return (
    <LabelContainer>
      <LabelCheckBox
        type="checkbox"
        checked={isActive}
        onChange={() => toggleActive()}
      />
      <LabelBlock color={color} textColor={textColor} onClick={toggleActive}>
        {title}
      </LabelBlock>
      <EditLabelButton id={id} title={title} color={color} />
    </LabelContainer>
  );
};

export default LabelItem;
