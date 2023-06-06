import styled from "styled-components";

export const ParticipantsButton = styled.button`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 0.25rem;
  border: none;
  border-radius: 0.25rem;
  background-color: gray;
  color: white;
  padding: 0.5rem;
`;

export const ParticipantsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 1rem;
  min-width: 250px;
`;

export const ParticipantsHeading = styled.div`
  /* margin-bottom: 0.5rem; */
  color: #202020;
  font-weight: bold;
  font-size: 0.8rem;
`;

export const UserButton = styled.button`
  display: flex;
  justify-content: space-between;
  border: none;
  border-radius: 0.25rem;
  background-color: #ddd;
  padding: 0.5rem;
  width: 100%;
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
