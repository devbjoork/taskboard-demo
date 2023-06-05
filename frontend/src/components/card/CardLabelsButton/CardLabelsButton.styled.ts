import styled from 'styled-components';

export const LabelsButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  border: none;
  border-radius: 0.25rem;
  background-color: gray;
  color: white;
  padding: 0.5rem;
`;

export const LabelsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: #fff;
  border-radius: 0.25rem;
`;

export const LabelsControls = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 1rem;
`;

export const CreateLabelButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  border: none;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  background-color: #ddd;
`;
