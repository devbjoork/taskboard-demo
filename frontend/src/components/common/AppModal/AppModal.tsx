import { Overlay, ModalContainer } from "./AppModal.styled";


const AppModal: React.FC<any> = ({ children, handleClose }) => {
  return (
    <Overlay onClick={handleClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>{children}</ModalContainer>
    </Overlay>
  );
};

export default AppModal;
