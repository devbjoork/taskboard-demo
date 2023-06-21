import { MenuButton, ProfilePopoverMenu } from './ProfileMenuList.styled';

interface ProfileMenuProps {
  logoutHandler: () => void;
}

const ProfileMenuList: React.FC<ProfileMenuProps> = (props) => {
  return (
    <ProfilePopoverMenu>
      <MenuButton onClick={() => props.logoutHandler()}>Logout</MenuButton>
    </ProfilePopoverMenu>
  );
};

export default ProfileMenuList;
