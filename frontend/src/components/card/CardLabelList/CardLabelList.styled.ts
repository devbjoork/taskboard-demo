import styled from 'styled-components';

export const LabelsLayout = styled.div`
  padding-left: 2.5rem;
`;

export const LabelContainer = styled.div`
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
  max-width: 500px;
`;

export const LabelHeading = styled.div`
  margin-bottom: 0.5rem;
  color: #202020;
  font-weight: bold;
  font-size: 0.8rem;
`;

interface LabelBlockProps {
  color: string;
  textColor: string;
}

export const LabelBlock = styled.div<LabelBlockProps>`
  border-radius: 0.25rem;
  background-color: ${(props) => props.color};
  color: ${(props) => props.textColor};
  padding: 0.5rem 0.5rem;
  min-width: 3rem;
  min-height: 2.1rem;
  font-size: 0.8rem;
  font-weight: 700;
`;
