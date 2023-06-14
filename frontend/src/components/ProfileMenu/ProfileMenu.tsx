import { useRef, useState } from 'react';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import ProfileMenuList from '../ProfileMenuList/ProfileMenuList';
import AppPopover from '../common/AppPopover';
import { UserButton } from './ProfileMenu.styled';

interface ProfileMenuProps {
  profileThumb: string;
  logoutHandler: any;
}

const ProfileMenu: React.FC<ProfileMenuProps> = (props) => {
  const [popoverVisible, setPopoverVisible] = useState(false);
  const popoverRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLElement>(null);

  useOnClickOutside(popoverRef, () => setPopoverVisible(false), [
    buttonRef as any,
  ]);

  return (
    <div>
      <UserButton
        onClick={() => setPopoverVisible(!popoverVisible)}
        ref={buttonRef as any}
      >
        <img src={props.profileThumb} height="32" width="32" />
      </UserButton>
      {popoverVisible && (
        <AppPopover
          ref={popoverRef}
          anchorRef={buttonRef}
          horizontal="end"
          gap={10}
          title='@you'
          handleClose={() => setPopoverVisible(false)}
        >
          <ProfileMenuList
            logoutHandler={() => {
              setPopoverVisible(false);
              props.logoutHandler();
            }}
          />
        </AppPopover>
      )}
    </div>
  );
};

export default ProfileMenu;
