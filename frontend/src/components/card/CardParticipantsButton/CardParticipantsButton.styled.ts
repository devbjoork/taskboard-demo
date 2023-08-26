import styled from 'styled-components';

interface ButtonProps {
  isRound?: boolean;
}

export const ParticipantsButton = styled.button<ButtonProps>`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 0.25rem;
  border: 1px solid #58595a;
  border-radius: ${(props) => (props.isRound ? '2rem' : '0.25rem')};
  background-color: #f9f9f9;
  color: #58595a;
  padding: ${(props) => (props.isRound ? '0.5rem' : '0.5rem 2rem')};

  :hover {
    background-color: #f1f1f1;
  }
`;

export const ParticipantsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 1rem;
  min-width: 250px;
`;

export const ParticipantsHeading = styled.div`
  color: #202020;
  font-weight: bold;
  font-size: 0.8rem;
`;

export const UserButton = styled.button`
  display: flex;
  justify-content: space-between;
  border: none;
  border-radius: 0.25rem;
  background-color: #f7f7f7;
  padding: 0.5rem;
  width: 100%;
  transition: all 76ms ease-in-out;

  &:hover {
    background-color: #f5f5f5;
  }

  svg {
    color: #4a4a4a;
    transition: all 76ms ease-in-out;

    &:hover {
      color: gold;
    }
  }
`;

export const UserDataGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 0.25rem;
`;

export const ParticipantImage = styled.img`
  border-radius: 1rem;
  height: 1rem;
`;
