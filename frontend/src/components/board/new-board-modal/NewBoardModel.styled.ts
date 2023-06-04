import styled from 'styled-components';

export const Overlay = styled.div`
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

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  color: #58595a;
  border: 1px solid #999;
  border-radius: 0.25rem;
  padding: 1rem;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: center;
`;

export const LabeledInput = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0;

  input {
    padding: 0.25rem;
    background-color: #fbfbfb;
    border: 2px solid #ddd;
    border-radius: 0.25rem;

    &:focus {
      outline: transparent;
      background-color: #ffffff;
      border: 2px solid #1b96ff;
    }
  }

  label {
    font-size: 0.85rem;
    font-weight: bold;
  }
`;

export const LabeledSelect = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0;

  label {
    font-size: 0.85rem;
    font-weight: bold;
  }

  select {
    padding: 0.25rem;
    background-color: #fbfbfb;
    border: 2px solid #ddd;
    border-radius: 0.25rem;

    &:focus {
      outline: transparent;
      background-color: #ffffff;
      border: 2px solid #1b96ff;
    }
  }
`;

export const ModalButton = styled.button`
  background-color: #1b96ff;
  border: none;
  border-radius: 0.25rem;
  padding: 0.5rem;
  color: #fff;
`;
