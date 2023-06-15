import { useState } from 'react';
import AppModal from '../../common/AppModal/AppModal';
import {
  ModalHeader,
  LabeledInput,
  LabeledSelect,
  ModalButton,
  CloseButton,
  SectionHeader,
  ThemeSection,
  ThemeButton,
  ModalControls,
} from './NewBoardModel.styled';
import { useNavigate } from 'react-router-dom';
import { useCreateBoardMutation } from '../../../services/bff/boards.api';
import { Icon } from '@iconify/react';

const themes = [
  {
    id: 1,
    name: 'Blue',
    type: 'flat',
    colors: { bg: '#62b6ff', shadow: '#62b6ff' },
  },
  {
    id: 2,
    name: 'Purple',
    type: 'flat',
    colors: { bg: '#8962ff', shadow: '#8962ff' },
  },
  {
    id: 3,
    name: 'Light blue',
    type: 'flat',
    colors: { bg: '#62ffe9', shadow: '#62ffe9' },
  },
  {
    id: 4,
    name: 'Orange',
    type: 'flat',
    colors: { bg: '#ffaa62', shadow: '#ffaa62' },
  },
  {
    id: 5,
    name: 'Gray',
    type: 'flat',
    colors: { bg: '#242424', shadow: '#242424' },
  },
];

const NewBoardModal: React.FC<any> = ({ handleClose }) => {
  const [title, setTitle] = useState('');
  const [visibility, setVisibility] = useState('private');
  const [themeSelected, setThemeSelected] = useState(0); 

  const navigate = useNavigate();
  const [createBoard] = useCreateBoardMutation();

  const create = async () => {
    const res: any = await createBoard({ title, visibility });
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
        {/* <label>Board title</label> */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </LabeledInput>
      <SectionHeader>
        <label>Visibility</label>
      </SectionHeader>
      <LabeledSelect>
        {/* <label>Visibility</label> */}
        <select
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
        >
          <option value="private">Private</option>
          <option value="public">Public</option>
        </select>
      </LabeledSelect>
      <SectionHeader><label>Theme</label></SectionHeader>
      <ThemeSection>
        {themes.map((theme) => (
          <ThemeButton
            key={theme.id}
            color={theme.colors.bg}
            title={theme.name}
            onClick={() => setThemeSelected(theme.id)}
          >
            { themeSelected === theme.id && (<Icon icon="charm:tick" height={21} />)}
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
