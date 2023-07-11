import { useContext } from 'react';

import { CardIdContext } from '@/contexts/CardIdContext';
import { LabelState } from '@/services/bff/types';

import CardLabelsButton from '../CardLabelsButton/CardLabelsButton';
import { LabelBlock, LabelContainer, LabelHeading } from './CardLabelList.styled';

interface CardLabelListProps {
  activeLabels: LabelState[];
}

const CardLabelList: React.FC<CardLabelListProps> = ({ activeLabels }) => {
  const cardId = useContext(CardIdContext);
  return (
    <div>
      {activeLabels && activeLabels.length > 0 && <LabelHeading>Labels</LabelHeading>}

      <LabelContainer>
        {activeLabels &&
          activeLabels.map((label) => {
            return (
              <LabelBlock key={label._id} color={label.color} textColor={label.textColor}>
                {label.title}
              </LabelBlock>
            );
          })}
        <CardLabelsButton activeLabels={activeLabels} cardId={cardId} style="add" />
      </LabelContainer>
    </div>
  );
};

export default CardLabelList;
