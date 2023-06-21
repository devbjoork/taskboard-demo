import styled from 'styled-components';

export const ModalHeader = styled.div`
  display: flex;
`;

export const ModalSubHeader = styled.div`
  font-size: smaller;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1rem;
`;

export const ModalSideBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
`;

export const ModalDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ModalSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TitleInput = styled.input`
  height: 1.75rem;
  padding-left: 0.5rem;
  border: 2px solid #62b6ff;
  border-radius: 0.25rem;
  outline: transparent;
`;

export const CardBodyArea = styled.textarea`
  min-width: 40rem;
  min-height: 15rem;
  border-radius: 0.25rem;
  resize: none;
`;

export const DeleteButton = styled.button`
  border: none;
  border-radius: 0.25rem;
  padding: 0.5rem 2rem;
  background-color: #f5f5f5;

  &:hover {
    background-color: #e7e7e7;
  }
`;

export const SaveButton = styled.button`
  border: none;
  border-radius: 0.25rem;
  padding: 0.5rem 2rem;
  background-color: #f5f5f5;

  &:hover {
    background-color: #e7e7e7;
  }
`;
