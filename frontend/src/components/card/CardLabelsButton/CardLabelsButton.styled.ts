import styled from 'styled-components';

interface ButtonProps {
  isCompact?: boolean;
}

export const LabelsButton = styled.button<ButtonProps>`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 0.25rem;
  border: 1px solid #58595a;
  border-radius: 0.25rem;
  background-color: #f9f9f9;
  color: #58595a;
  padding: ${(props) => (props.isCompact ? '0.5rem' : '0.5rem 2rem')};

  :hover {
    background-color: #f1f1f1;
  }
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
