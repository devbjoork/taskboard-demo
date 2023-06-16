import styled from 'styled-components';

export const ModalHeader = styled.div`
  font-size: 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border: none;
  border-radius: 1rem;
  padding: 0.3rem;
  color: #555;
  transition: all 76ms ease-in-out;

  &:hover {
    background-color: #ddd;
  }
`;

export const LabeledInput = styled.div`
  display: flex;
  flex-direction: column;

  input {
    padding: 0.5rem 0.25rem;
    background-color: #fbfbfb;
    border: 2px solid #ddd;
    border-radius: 0.25rem;
    padding-left: 0.5rem;
    transition: all 76ms ease-in-out;

    &:hover {
      background-color: #ffffff;
      border: 2px solid #1b96ff;
    }

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

  label {
    font-size: 0.85rem;
    font-weight: bold;
  }

  select {
    padding: 0.5rem 0.25rem;
    background-color: #fbfbfb;
    border: 2px solid #ddd;
    border-radius: 0.25rem;
    transition: all 76ms ease-in-out;

    &:focus {
      outline: transparent;
      background-color: #ffffff;
      border: 2px solid #1b96ff;
    }

    &:hover {
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

export const SectionHeader = styled.div`
  line-height: 2rem;
  font-size: 0.8rem;
  font-weight: bold;
  color: #1e1e1e;
`;

export const ThemeSection = styled.div`
  background-color: aliceblue;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
`;

export const ThemeButton = styled.button`
  min-height: 2rem;
  width: 4rem;
  border: none;
  border-radius: 0.25rem;
  background-color: ${(props) => props.color};
  transition: all 76ms ease-in-out;
  &:hover {
    transform: scale(1.1);
  }

  svg {
    color: #fafafa;
  }
`;

export const ModalControls = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: end;
  align-items: center;
`;
