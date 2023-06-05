import styled from 'styled-components';

export const CreateLabelButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  border: none;
  border-radius: 0.25rem;
  background: none;
`;

export const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
`;

export const SectionHeader = styled.div``;

export const EditSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const TitleInput = styled.input`
  display: flex;
  border: 2px solid lightgray;
  border-radius: 0.25rem;
  padding: 0.5rem;

  &:focus {
    border: 2px solid #328dfd;
    outline: none;
  }
`;

export const PaletteGridLayout = styled.div`
  display: grid;
  min-width: 300px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 0.25rem;
`;

interface PaletteItemProps {
  color: string;
  isActive: boolean;
}

export const PaletteItem = styled.button<PaletteItemProps>`
  border: ${(props) => props.isActive ? '3px solid #328dfd' : 'none'};
  background-color: ${(props) => props.color};
  height: 30px;
`;

export const EditControls = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
`;

export const SaveButton = styled.button`
  border: none;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  background-color: #ddd;
`;

export const DeleteButton = styled.button`
  border: none;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  background-color: #ddd;
`;
