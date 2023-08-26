import styled from 'styled-components';

export const PreviewContainer = styled.div`
  display: flex;
  column-gap: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #eee;
`;

export const ProfileThumb = styled.img`
  height: 5rem;
  border-radius: 100%;
`;

export const ProfileData = styled.div`
  display: flex;
  flex-direction: column;
  height: 50%;
  width: 100%;
  background-color: green;
`;

export const ProfileName = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
`;

export const ProfileEmail = styled.div`
  font-size: 0.9rem;
`;
