import { useDeleteCardMutation } from '@/services/bff/cards.api';
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
  const [deleteCard] = useDeleteCardMutation();

  return (
    <ToolbarContainer>
      <CardParticipantsButton cardId={card._id} />
      <CardLabelsButton activeLabels={displayedLabels} cardId={card._id} />
      <button onClick={() => deleteCard(card._id)}>Delete</button>
    </ToolbarContainer>
  );
};

export default CardModalToolbar;
