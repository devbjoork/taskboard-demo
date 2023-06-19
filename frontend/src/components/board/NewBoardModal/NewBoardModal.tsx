import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import AppModal from '../../common/AppModal/AppModal';
import { useCreateBoardMutation } from '@/services/bff/boards.api';
import {
  ModalHeader,
  CloseButton,
  SectionHeader,
  LabeledInput,
  LabeledSelect,
  ThemeSection,
  ThemeButton,
  ModalControls,
  ModalButton,
} from './NewBoardModel.styled';

const NewBoardModal: React.FC<any> = ({ handleClose, themeList }) => {
  const [title, setTitle] = useState('');
  const [visibility, setVisibility] = useState('private');
  const [themeSelected, setThemeSelected] = useState(themeList[0]._id);

  const navigate = useNavigate();
  const [createBoard] = useCreateBoardMutation();

  const create = async () => {
    const res: any = await createBoard({
      title,
      visibility,
      themeId: themeSelected,
    });
    navigate(`/board/${res.data._id}`);
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
        <label>Board title</label>
      </SectionHeader>
      <LabeledInput>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </LabeledInput>
      <SectionHeader>
        <label>Visibility</label>
      </SectionHeader>
      <LabeledSelect>
        <select value={visibility} onChange={(e) => setVisibility(e.target.value)}>
          <option value="private">Private</option>
          <option value="public">Public</option>
        </select>
      </LabeledSelect>
      <SectionHeader>
        <label>Theme</label>
      </SectionHeader>
      <ThemeSection>
        {themeList.map((theme: any) => (
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
