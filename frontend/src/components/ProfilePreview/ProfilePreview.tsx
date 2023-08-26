import { UserData } from '@/services/bff/types';

import AppPopover from '../common/AppPopover';
import {
  PreviewContainer,
  ProfileData,
  ProfileEmail,
  ProfileName,
  ProfileThumb,
} from './ProfilePreview.styled';

type ProfilePreviewProps = {
  user: UserData;
};

const ProfilePreview: React.FC<ProfilePreviewProps> = ({ user }) => {
  return (
    <PreviewContainer>
      <ProfileThumb src={user.photoURL} />
      <ProfileData>
        <ProfileName>{user.displayName}</ProfileName>
        <ProfileEmail>{user.email}</ProfileEmail>
      </ProfileData>
    </PreviewContainer>
  );
};

export default ProfilePreview;
