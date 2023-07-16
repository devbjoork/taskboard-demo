import styled from 'styled-components';

export const ProfileThumb = styled.img`
  border-radius: 2rem;
  height: 2rem;
`;

export const ActionContainer = styled.div`
  display: flex;
  gap: 0.5rem;

  .tox {
    width: 100%;
  }
`;

export const NewComment = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

export const NewCommentControls = styled.div`
  display: flex;
  column-gap: 0.5rem;

  button {
    padding: 0.5rem 1rem;
    background-color: #f0f0f0;
    border: none;
    border-radius: 0.25rem;
  }
`;

export const Comment = styled.div`
  display: flex;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #fafafa;
  background-color: #fafafa;
  font-size: 0.8rem;
  flex: 1;
`;
