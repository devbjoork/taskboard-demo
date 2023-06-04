import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { LabelContainer, LabelBlock } from './LabelItem.styled';

interface LabelItemProps {
  id: string;
  boardId: string;
  cardId: string;
  columnId: string;
  color: string;
  title?: string;
  active: boolean;
}

const LabelItem: React.FC<LabelItemProps> = ({
  id,
  color,
  title,
  boardId,
  columnId,
  cardId,
  active,
}) => {
  const [isActive, setIsActive] = useState(active);

  const dispatch = useDispatch();

  const toggleActive = () => {
    setIsActive(!isActive);
    // dispatch(assignLabel({ cardId, labelId: id, columnId, active: isActive }));
  };

  return (
    <LabelContainer>
      <input type="checkbox" checked={isActive} onChange={toggleActive} />
      <LabelBlock color={color} onClick={toggleActive}>
        {title} 1
      </LabelBlock>
      <button>x</button>
    </LabelContainer>
  );
};

export default LabelItem;
