import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCreateBoardMutation } from '@/services/bff/boards.api';
import { Board, ThemePrefs } from '@/services/bff/types';

import AppModal from '../../common/AppModal/AppModal';
import {
  CloseButton,
  LabeledInput,
  LabeledSelect,
  ModalButton,
  ModalControls,
  ModalHeader,
  SectionHeader,
  ThemeButton,
  ThemeSection,
} from './NewBoardModel.styled';

interface NewBoardModalProps {
  handleClose: () => void;
  themeList: ThemePrefs[];
}

const NewBoardModal: React.FC<NewBoardModalProps> = ({ handleClose, themeList }) => {
  const [title, setTitle] = useState('');
  const [visibility, setVisibility] = useState('private');
  const [themeSelected, setThemeSelected] = useState(themeList[0]._id);

  const navigate = useNavigate();
  const [createBoard] = useCreateBoardMutation();

  const create = async () => {
    const newBoard: Board = await createBoard({
      title,
      visibility,
      themeId: themeSelected,
    }).unwrap();
    navigate(`/board/${newBoard._id}`);
  };

  return (
    <AppModal handleClose={handleClose}>
      <ModalHeader>
        Create board
        <CloseButton onClick={handleClose}>
          <Icon icon="ic:round-close" height={16} />
        </CloseButton>
      </ModalHeader>
      <SectionHeader>
        <label htmlFor="title">Board title</label>
      </SectionHeader>
      <LabeledInput>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </LabeledInput>
      <SectionHeader>
        <label htmlFor="visibility">Visibility</label>
      </SectionHeader>
      <LabeledSelect>
        <select id="visibility" value={visibility} onChange={(e) => setVisibility(e.target.value)}>
          <option value="private">Private</option>
          <option value="public">Public</option>
        </select>
      </LabeledSelect>
      <SectionHeader>
        <label htmlFor="theme">Theme</label>
      </SectionHeader>
      <ThemeSection id="theme">
        {themeList.map((theme: ThemePrefs) => (
          <ThemeButton key={theme._id} color={theme.colors.bg} title={theme.name} onClick={() => setThemeSelected(theme._id)}>
            {themeSelected === theme._id && <Icon icon="charm:tick" height={21} />}
          </ThemeButton>
        ))}
      </ThemeSection>
      <ModalControls>
        <ModalButton onClick={create}>Create</ModalButton>
      </ModalControls>
    </AppModal>
  );
};

export default NewBoardModal;
