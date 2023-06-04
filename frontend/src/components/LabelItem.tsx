import { SyntheticEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

const LabelContainer = styled.div`
  margin-top: 0.2rem;
  display: flex;
  column-gap: 0.5rem;
`;

const LabelBlock = styled.div`
  /* display: flex; */
  /* justify-content: space-between; */
  background-color: ${(props) => props.color || '#333'};
  border-radius: 0.25rem;
  flex: 1;
  /* padding: 0.1rem 0.5rem; */
  min-height: 1.5rem;
  color: #fff;
`;

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
