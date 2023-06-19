import React, { useContext, useState } from 'react';
import ReactDOM from 'react-dom';
// import { LabelState } from '../../../store/boardsSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import LabelItem from '../../LabelItem/LabelItem';
import {
  Overlay,
  ModalContainer,
  TitleInput,
  ModalHeader,
  ModalSubHeader,
  ModalContent,
  ModalSection,
  CardBodyArea,
  ModalSideBar,
  DeleteButton,
  SaveButton,
  ModalDetails,
} from './CardModal.styled';
import { useDeleteCardMutation, useUpdateCardMutation } from '../../../services/bff/cards.api';
import { BoardIdContext } from '../../../pages/board/BoardPage';
import { useGetBoardByIdQuery } from '../../../services/bff/boards.api';
import CardLabelsButton from '../CardLabelsButton/CardLabelsButton';
import CardLabelList from '../CardLabelList/CardLabelList';
import CardParticipantsButton from '../CardParticipantsButton/CardParticipantsButton';
import CardParticipantList from '../CardParticipantList/CardParticipantList';

const CardModal: React.FC<any> = ({ id, title, body, createdAt, columnTitle, columnId, activeCardLabels, participants, handleClose }) => {
  const [cardBody, setCardBody] = useState(body);
  const [cardTitle, setCardTitle] = useState(title);
  const [isTitleEdit, setIsTitleEdit] = useState(false);

  const boardId = useContext(BoardIdContext);
  const { currentData, isFetching } = useGetBoardByIdQuery(boardId);

  const [deleteCardMutation] = useDeleteCardMutation();
  const [updateCardMutation] = useUpdateCardMutation();

  const handleClickOutside = async (e: any) => {
    if (!isTitleEdit) return;
    const node = ReactDOM.findDOMNode(this);
    if (!node || !node.contains(e.target)) {
      setIsTitleEdit(false);
    }
  };

  const isLabelActive = (labelId: string) => {
    return activeCardLabels.includes(labelId);
  };

  return (
    <Overlay onClick={() => handleClose()}>
      <ModalContainer
        onClick={(e) => {
          handleClickOutside(e);
          e.stopPropagation();
        }}
      >
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
              <CardLabelList activeLabels={activeCardLabels} columnId={columnId} cardId={id} />
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
            <CardParticipantsButton cardId={id} currentAssignes={participants} />
            <CardLabelsButton activeLabels={activeCardLabels} columnId={columnId} cardId={id} />
          </ModalSideBar>
        </ModalContent>
      </ModalContainer>
    </Overlay>
  );
};

export default CardModal;
