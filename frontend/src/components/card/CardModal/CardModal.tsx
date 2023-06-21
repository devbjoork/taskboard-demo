import { useState } from 'react';

import AppModal from '@/components/common/AppModal/AppModal';
import { useDeleteCardMutation, useUpdateCardMutation } from '@/services/bff/cards.api';
import { LabelState } from '@/services/bff/types';

import CardLabelList from '../CardLabelList/CardLabelList';
import CardLabelsButton from '../CardLabelsButton/CardLabelsButton';
import CardParticipantList from '../CardParticipantList/CardParticipantList';
import CardParticipantsButton from '../CardParticipantsButton/CardParticipantsButton';
import {
  CardBodyArea,
  DeleteButton,
  ModalContent,
  ModalDetails,
  ModalHeader,
  ModalSection,
  ModalSideBar,
  ModalSubHeader,
  SaveButton,
  TitleInput,
} from './CardModal.styled';

interface CardModalProps {
  id: string;
  title: string;
  body: string;
  createdAt: Date;
  columnTitle: string;
  activeCardLabels: LabelState[];
  participants: string[];
  handleClose: () => void;
}

const CardModal: React.FC<CardModalProps> = ({ id, title, body, createdAt, columnTitle, activeCardLabels, participants, handleClose }) => {
  const [cardBody, setCardBody] = useState(body);
  const [cardTitle, setCardTitle] = useState(title);
  const [isTitleEdit, setIsTitleEdit] = useState(false);

  const [deleteCardMutation] = useDeleteCardMutation();
  const [updateCardMutation] = useUpdateCardMutation();

  return (
    <AppModal handleClose={handleClose}>
      {isTitleEdit ? (
        <TitleInput type="text" value={cardTitle} onChange={(e) => setCardTitle(e.target.value)} onClick={(e) => e.stopPropagation()} />
      ) : (
        <ModalHeader onClick={() => setIsTitleEdit(true)}>{cardTitle}</ModalHeader>
      )}
      <ModalSubHeader>At column {columnTitle}</ModalSubHeader>
      <ModalSubHeader>Created at: {new Date(createdAt).toLocaleString()}</ModalSubHeader>
      <ModalContent>
        <ModalDetails>
          <ModalSection>
            <CardParticipantList participants={participants} />
          </ModalSection>
          <ModalSection>
            <CardLabelList activeLabels={activeCardLabels} />
          </ModalSection>
          <ModalSection>
            <div>Card Description</div>
            <CardBodyArea value={cardBody} onChange={(e) => setCardBody(e.target.value)} />
          </ModalSection>
        </ModalDetails>
        <ModalSideBar>
          <div>Actions</div>
          <DeleteButton
            onClick={() => {
              deleteCardMutation(id);
            }}
          >
            Delete Card
          </DeleteButton>
          <SaveButton
            onClick={() => {
              updateCardMutation({
                body: { title: cardTitle, body: cardBody },
                cardId: id,
              });
              handleClose();
            }}
          >
            Save
          </SaveButton>
          <CardParticipantsButton cardId={id} />
          <CardLabelsButton activeLabels={activeCardLabels} cardId={id} />
        </ModalSideBar>
      </ModalContent>
    </AppModal>
  );
};

export default CardModal;
