import styled from 'styled-components';

export const LabelContainer = styled.div`
  margin-top: 0.2rem;
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
`;

interface LabelBlockProps {
  color: string;
  textColor: string;
}

export const LabelBlock = styled.div<LabelBlockProps>`
  background-color: ${(props) => props.color || '#333'};
  color: ${(props) => props.textColor || '000'};
  border-radius: 0.25rem;
  flex: 1;
  font-weight: 500;
  font-size: 0.8rem;
  min-height: 2rem;
  line-height: 2rem;
  padding-left: 0.7rem;
  min-width: 200px;
`;

export const LabelCheckBox = styled.input`
  min-height: 1.5rem;
  min-width: 1.2rem;
`;

export const DeleteLabelButton = styled.button`
  border: none;
  border-radius: 0.25rem;
  background: none;
  color: #091e42;
  width: 1.5rem;
`;
