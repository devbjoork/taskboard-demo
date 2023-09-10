import { Link } from 'react-router-dom';

import {
  MenuButton,
  MenuSeparator,
  ProfilePopoverMenu,
} from './ProfileMenuList.styled';

interface ProfileMenuProps {
  logoutHandler: () => void;
}

const ProfileMenuList: React.FC<ProfileMenuProps> = (props) => {
  return (
    <ProfilePopoverMenu>
      <MenuButton>
        <Link to="/profile">Profile</Link>
      </MenuButton>
      <MenuButton>
        <Link to="/preferences">Preferences</Link>
      </MenuButton>
      <MenuSeparator />
      <MenuButton onClick={() => props.logoutHandler()}>Logout</MenuButton>
    </ProfilePopoverMenu>
  );
};

export default ProfileMenuList;
