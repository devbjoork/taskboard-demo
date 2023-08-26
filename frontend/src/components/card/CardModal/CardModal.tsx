import { memo, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import AppModal from '@/components/common/AppModal/AppModal';
import { BoardIdContext } from '@/contexts/BoardIdContext';
import { CardIdContext } from '@/contexts/CardIdContext';
import { useBoardActions } from '@/hooks/useBoardActions';
import { useBoardLabels } from '@/hooks/useBoardLabels';
import { useGetBoardByIdQuery } from '@/services/bff/boards.api';

import CardActions from '../CardActions/CardActions';
import CardDetails from '../CardDetails/CardDetails';
import CardLabelList from '../CardLabelList/CardLabelList';
import CardModalHeader from '../CardModalHeader/CardModalHeader';
import CardModalToolbar from '../CardModalToolbar/CardModalToolbar';
import CardParticipantList from '../CardParticipantList/CardParticipantList';
import {
  CardModalContainer,
  CardModalHorizontalLayout,
  CardModalMain,
} from './CardModal.styled';

const CardModal: React.FC = memo(function CardModal() {
  const boardId = useContext(BoardIdContext);
  const cardId = useContext(CardIdContext);
  const navigate = useNavigate();

  const labels = useBoardLabels(boardId);
  const actions = useBoardActions(boardId);

  const closeModal = () => navigate(`/board/${boardId}`);

  const { currentData } = useGetBoardByIdQuery(boardId);

  const card = currentData && currentData.cards.find((c) => c._id === cardId);
  const cardLabels = labels.filter((l) => card?.labels.includes(l._id));
  const cardActions = actions.filter((a) => card?.actions.includes(a._id));

  if (!card) return <></>;
  else
    return (
      <AppModal handleClose={closeModal}>
        <CardModalContainer>
          <CardModalHeader title={card.title} handleClose={closeModal} />
          <CardModalHorizontalLayout>
            <CardModalMain>
              <CardParticipantList participants={card.assignee} />
              <CardLabelList activeLabels={cardLabels} />
              <CardDetails content={card.body} />
              <CardActions actions={cardActions} users={currentData.userData} />
            </CardModalMain>
            <CardModalToolbar
              card={card}
              board={currentData}
            ></CardModalToolbar>
          </CardModalHorizontalLayout>
        </CardModalContainer>
      </AppModal>
    );
});

export default CardModal;
