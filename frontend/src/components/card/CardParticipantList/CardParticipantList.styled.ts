import styled from 'styled-components';

export const ParticipantsHeading = styled.div`
  margin-bottom: 0.5rem;
  color: #202020;
  font-weight: bold;
  font-size: 0.8rem;
`;

export const ParticipantsContainer = styled.div`
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
  max-width: 500px;
`;

export const ParticipantsBlock = styled.button`
  border: none;
  border-radius: 2rem;
  height: 2rem;

  img {
    height: 2rem;
    border-radius: 2rem;

    /* &:hover {
      outline: 1px solid black;
    } */
  }
`;
