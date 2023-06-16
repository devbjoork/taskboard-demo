import { ProfilePopoverMenu } from './ProfileMenuList.styled';

interface ProfileMenuProps {
  logoutHandler: any;
}

const ProfileMenuList: React.FC<ProfileMenuProps> = (props) => {
  return (
    <ProfilePopoverMenu>
      <ul>
        <li onClick={() => props.logoutHandler()}>Logout</li>
      </ul>
    </ProfilePopoverMenu>
  );
};

export default ProfileMenuList;
