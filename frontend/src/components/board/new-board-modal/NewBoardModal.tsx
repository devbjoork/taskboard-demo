import React, { useState } from 'react';
import {
  Overlay,
  ModalContainer,
  ModalHeader,
  LabeledInput,
  LabeledSelect,
  ModalButton,
} from './NewBoardModel.styled';

const NewBoardModal: React.FC<any> = ({ handleClose, handleCreate }) => {
  const [title, setTitle] = useState('');
  const [visibility, setVisibility] = useState('private');

  const create = () => {
    return handleCreate({
      title,
      visibility,
    });
  };

  return (
    <Overlay onClick={() => handleClose()}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>Create board</ModalHeader>
        <LabeledInput>
          <label>Board title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </LabeledInput>
        <LabeledSelect>
          <label>Visibility</label>
          <select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
          >
            <option value="private">Private</option>
            <option value="public">Public</option>
          </select>
        </LabeledSelect>
        <ModalButton onClick={create}>Create</ModalButton>
      </ModalContainer>
    </Overlay>
  );
};

export default NewBoardModal;
