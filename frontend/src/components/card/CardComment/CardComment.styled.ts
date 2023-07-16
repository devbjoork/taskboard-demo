import styled from 'styled-components';

import { FlexColumn, FlexRow } from '@/components/common/styled/layout';

export const Container = styled(FlexRow)`
  gap: 0.5rem;

  .tox {
    width: 100%;
  }
`;

export const ProfileThumb = styled.img`
  border-radius: 2rem;
  height: 2rem;
`;

export const CommentLayout = styled(FlexColumn)`
  row-gap: 0.5rem;
  flex: 1;
`;

export const Header = styled(FlexRow)`
  align-items: center;
  column-gap: 1rem;
  flex-wrap: wrap;
`;

export const Comment = styled(FlexRow)`
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #fafafa;
  background-color: #fafafa;
  font-size: 0.8rem;
  flex: 1;
`;

export const CommentControls = styled(FlexRow)`
  display: flex;
  column-gap: 0.5rem;

  button {
    background-color: transparent;
    border: none;
    text-decoration: underline;
    font-weight: bold;
    font-size: 0.75rem;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  column-gap: 0.5rem;

  button {
    padding: 0.5rem 1rem;
    background-color: #f0f0f0;
    border: none;
    border-radius: 0.25rem;
  }
`;

export const EditedMark = styled.div`
  font-size: 0.8rem;
`;
