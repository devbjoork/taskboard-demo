import { LabelState } from '@/services/bff/types';
import { LabelHeading, LabelContainer, LabelBlock } from './CardLabelList.styled';

interface CardLabelListProps {
  activeLabels: LabelState[];
  columnId: string;
  cardId: string;
}

const CardLabelList: React.FC<CardLabelListProps> = ({ activeLabels, columnId, cardId }) => {
  return (
    <>
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
      </LabelContainer>
    </>
  );
};

export default CardLabelList;
