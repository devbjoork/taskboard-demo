import { Board, CardState } from '@/services/bff/types';

import CardLabelsButton from '../CardLabelsButton/CardLabelsButton';
import CardParticipantsButton from '../CardParticipantsButton/CardParticipantsButton';
import { ToolbarContainer } from './CardModalToolbar.styled';

interface CardModalToolbarProps {
  card: CardState;
  board: Board;
}

const CardModalToolbar: React.FC<CardModalToolbarProps> = ({ card, board }) => {
  const displayedLabels = board.labels.filter((label) => card.labels.includes(label._id)) || [];

  return (
    <ToolbarContainer>
      <CardParticipantsButton cardId={card._id} />
      <CardLabelsButton activeLabels={displayedLabels} cardId={card._id} />
    </ToolbarContainer>
  );
};

export default CardModalToolbar;
