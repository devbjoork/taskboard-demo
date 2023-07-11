import styled from 'styled-components';

export const ProfilePageContainer = styled.main`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  padding: 2rem;
`;

export const ProfileTitle = styled.h2`
  font-size: 1.5rem;
`;

export const UserInfoSection = styled.section`
  display: flex;
  align-items: center;
  column-gap: 1rem;
  padding: 1rem;
  border-radius: 0.25rem;
  background-color: #fff;
  border: 2px solid #fafafa;
`;

export const UserEditSection = styled.section`
  display: flex;
  align-items: center;
  column-gap: 1rem;
  padding: 1rem;
  border-radius: 0.25rem;
  background-color: #fff;
  border: 2px solid #fafafa;
`;

export const UserProfileImage = styled.img`
  border-radius: 5rem;
  height: 5rem;
  width: 5rem;
`;

export const UserContactInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserName = styled.div`
  font-size: 2rem;
`;

export const UserEmail = styled.div`
  font-size: 1.25rem;
`;
