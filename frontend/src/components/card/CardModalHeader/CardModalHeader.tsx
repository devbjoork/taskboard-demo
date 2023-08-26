import { Icon } from '@iconify/react';
import { useContext } from 'react';

import AppEditableTitle from '@/components/common/AppEditableTitle';
import { CardIdContext } from '@/contexts/CardIdContext';
import { useUpdateCardMutation } from '@/services/bff/cards.api';

import { CloseButton, HeaderContainer } from './CardModalHeader.styled';

interface CardModalHeaderProps {
  title: string;
  handleClose: () => void;
}

const CardModalHeader: React.FC<CardModalHeaderProps> = ({
  title,
  handleClose,
}) => {
  const cardId = useContext(CardIdContext);
  const [updateCard] = useUpdateCardMutation();
  const saveTitle = (t: string) => {
    updateCard({ body: { title: t }, cardId });
  };

  return (
    <HeaderContainer>
      <Icon icon="carbon:account" height={24} />
      <AppEditableTitle initialValue={title} handleSubmit={saveTitle} />
      <CloseButton onClick={handleClose}>
        <Icon icon="ic:round-close" height={16} />
      </CloseButton>
    </HeaderContainer>
  );
};

export default CardModalHeader;
