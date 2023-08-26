import { useNavigate } from 'react-router-dom';

import {
  MenuButton,
  MenuSeparator,
  ProfilePopoverMenu,
} from './ProfileMenuList.styled';

interface ProfileMenuProps {
  logoutHandler: () => void;
}

const ProfileMenuList: React.FC<ProfileMenuProps> = (props) => {
  const navigate = useNavigate();

  return (
    <ProfilePopoverMenu>
      <MenuButton onClick={() => navigate('/profile')}>Profile</MenuButton>
      <MenuSeparator />
      <MenuButton onClick={() => props.logoutHandler()}>Logout</MenuButton>
    </ProfilePopoverMenu>
  );
};

export default ProfileMenuList;
