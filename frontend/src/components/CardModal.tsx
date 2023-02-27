import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
  useDeleteCardMutation,
  useUpdateCardMutation,
} from '../services/cards.api';
import { deleteCard, updateCard } from '../store/boardsSlice';

const Overlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100vw;
  height: 100vh;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border: 1px solid #999;
  border-radius: 0.25rem;
  padding: 1rem;
`;

const ModalHeader = styled.div`
  display: flex;
`;

const ModalSubHeader = styled.div`
  font-size: smaller;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1rem;
`;

const ModalSideBar = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const ModalSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleInput = styled.input`
  height: 1.75rem;
  padding-left: 0.5rem;
  border: 2px solid #62b6ff;
  border-radius: 0.25rem;
  outline: transparent;
`;

const CardBodyArea = styled.textarea`
  min-width: 20rem;
  min-height: 10rem;
  border-radius: 0.25rem;
  resize: none;
`;

const DeleteButton = styled.button`
  margin-top: 1rem;
  border: none;
  border-radius: 0.25rem;
  padding: 0.5rem 2rem;
  background-color: #f5f5f5;

  &:hover {
    background-color: #e7e7e7;
  }
`;

const SaveButton = styled.button`
  margin-top: 0.5rem;
  border: none;
  border-radius: 0.25rem;
  padding: 0.5rem 2rem;
  background-color: #f5f5f5;

  &:hover {
    background-color: #e7e7e7;
  }
`;

const CardModal: React.FC<any> = ({
  id,
  title,
  body,
  createdAt,
  columnTitle,
  columnId,
  handleClose,
}) => {
  const [cardBody, setCardBody] = useState(body);
  const [cardTitle, setCardTitle] = useState(title);
  const [isTitleEdit, setIsTitleEdit] = useState(false);

  const [deleteCardMutation] = useDeleteCardMutation();
  const [updateCardMutation] = useUpdateCardMutation();
  const dispatch = useDispatch();

  const deleteSelf = async () => {
    const result = await deleteCardMutation(id);
    dispatch(deleteCard({ columnId, id }));
    handleClose();
  };

  const saveSelf = async () => {
    const result = await updateCardMutation({
      body: { title: cardTitle, body: cardBody },
      cardId: id,
    });
    dispatch(
      updateCard({ columnId, taskId: id, body: cardBody, title: cardTitle })
    );
    handleClose();
  };

  const handleClickOutside = async (e: any) => {
    if (!isTitleEdit) return;
    const node = ReactDOM.findDOMNode(this);
    if (!node || !node.contains(e.target)) {
      setIsTitleEdit(false);
    }
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
          <TitleInput
            type="text"
            value={cardTitle}
            onChange={(e) => setCardTitle(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <ModalHeader onClick={() => setIsTitleEdit(true)}>
            {cardTitle}
          </ModalHeader>
        )}
        <ModalSubHeader>At column {columnTitle}</ModalSubHeader>
        <ModalSubHeader>
          Created at: {new Date(createdAt).toLocaleString()}
        </ModalSubHeader>
        <ModalContent>
          <ModalSection>
            <div>Card Description</div>
            <CardBodyArea
              value={cardBody}
              onChange={(e) => setCardBody(e.target.value)}
            />
          </ModalSection>
          <ModalSideBar>
            <div>Actions</div>
            <DeleteButton onClick={deleteSelf}>Delete Card</DeleteButton>
            <SaveButton onClick={saveSelf}>Save</SaveButton>
          </ModalSideBar>
        </ModalContent>
      </ModalContainer>
    </Overlay>
  );
};

export default CardModal;
