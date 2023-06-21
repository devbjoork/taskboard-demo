import { useRef, useState } from 'react';

import { useOnClickOutside } from '@/hooks/useOnClickOutside';

import AppPopover from '../common/AppPopover';
import ProfileMenuList from '../ProfileMenuList/ProfileMenuList';
import { UserButton } from './ProfileMenu.styled';

interface ProfileMenuProps {
  profileThumb: string;
  logoutHandler: () => void;
}

const ProfileMenu: React.FC<ProfileMenuProps> = (props) => {
  const [popoverVisible, setPopoverVisible] = useState(false);
  const popoverRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useOnClickOutside(popoverRef, () => setPopoverVisible(false), [buttonRef]);

  return (
    <div>
      <UserButton ref={buttonRef} onClick={() => setPopoverVisible(!popoverVisible)}>
        <img src={props.profileThumb} alt="you" height="32" width="32" />
      </UserButton>
      {popoverVisible && (
        <AppPopover ref={popoverRef} anchorRef={buttonRef} horizontal="end" gap={10} title="@you" handleClose={() => setPopoverVisible(false)}>
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
