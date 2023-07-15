import styled from 'styled-components';

export const ActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  padding-bottom: 2rem;
`;

export const ActionsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 1.2rem;
`;

export const HeaderGroup = styled.div`
  display: flex;
  column-gap: 1rem;
  align-items: center;
`;

export const DetailsButton = styled.button`
  padding: 0.5rem;
  border: none;
  border-radius: 0.25rem;
`;

export const ActionLayout = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.25rem;
  /* margin-left: 2.4rem; */
`;

export const ActionUserThumb = styled.img`
  height: 1rem;
  width: 1rem;
  border-radius: 1rem;
`;

export const ActionHeader = styled.div`
  display: flex;
  column-gap: 1rem;
  flex-wrap: wrap;
`;

export const ActionComment = styled.div`
  display: flex;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #fafafa;
  background-color: #fafafa;
  font-size: 0.8rem;
`;

export const ActionTimeStamp = styled.div`
  display: flex;
`;

export const ActionOptions = styled.div`
  display: flex;
  column-gap: 0.5rem;
`;

export const LinkButton = styled.div`
  border: none;
  background: none;
  font-size: 0.7rem;
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

export const CommentControls = styled.div`
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

export const CommentLayout = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  flex: 1;
`;
