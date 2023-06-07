import styled from 'styled-components';

export const ButtonShare = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-left: 1rem;
  padding: 0.25rem 1rem;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  background-color: rgba(255, 255, 255, 0.15);
  svg {
    font-size: 17px;
  }
  &:hover {
    background-color: rgba(255, 255, 255, 0.25);
  }
`;

export const ShareContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  width: 340px;
`;

export const ShareInfo = styled.div`
  font-weight: normal;
  font-size: 0.8rem;
`;

export const ShareInput = styled.input`
  margin-top: 0.25rem;
  padding: 0.5rem;

  &:focus {
    outline: 1px solid #3e98e7;
  }
`;

export const ShareControls = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-top: 0.5rem;
`;

export const ShareSubmitButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;

  &:hover {
    background-color: #e7e7e7;
  }

  &:focus {
    outline: 1px solid #3e98e7;
  }
`;
