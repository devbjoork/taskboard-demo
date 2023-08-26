import Header from '@/components/Header/Header';
import { useGetUserDataQuery } from '@/services/bff/users.api';

import {
  ProfilePageContainer,
  ProfileTitle,
  UserContactInfo,
  UserEditSection,
  UserEmail,
  UserInfoSection,
  UserName,
  UserProfileImage,
} from './ProfilePage.styled';

export const ProfilePage: React.FC = () => {
  const { data } = useGetUserDataQuery();

  if (!data) return <></>;

  return (
    <>
      <Header />
      <ProfilePageContainer>
        <ProfileTitle>Your profile</ProfileTitle>
        <UserInfoSection>
          <UserProfileImage src={data.photoURL} alt={data.displayName} />
          <UserContactInfo>
            <UserName>{data.displayName}</UserName>
            <UserEmail>{data.email}</UserEmail>
          </UserContactInfo>
        </UserInfoSection>
        <UserEditSection>Edit data here</UserEditSection>
      </ProfilePageContainer>
    </>
  );
};
