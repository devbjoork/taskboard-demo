import { useState } from 'react';

import {
  useAddLabelMutation,
  useRemoveLabelMutation,
} from '@/services/bff/cards.api';

import EditLabelButton from '../card/EditLabelButton/EditLabelButton';
import { LabelBlock, LabelCheckBox, LabelContainer } from './LabelItem.styled';

interface LabelItemProps {
  id: string;
  boardId: string;
  cardId: string;
  color: string;
  textColor: string;
  title?: string;
  active: boolean;
}

const LabelItem: React.FC<LabelItemProps> = ({
  id,
  color,
  textColor,
  title,
  boardId,
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
      labelId: id,
    };
    if (activated) {
      await addLabel(payload);
    } else {
      await removeLabel(payload);
    }
  };

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
