import { PropsWithChildren } from 'react';

import { ModalContainer, Overlay } from './AppModal.styled';

interface AppModalProps {
  handleClose: () => void;
}

const AppModal: React.FC<PropsWithChildren<AppModalProps>> = ({
  children,
  handleClose,
}) => {
  return (
    <Overlay onClick={handleClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalContainer>
    </Overlay>
  );
};

export default AppModal;
