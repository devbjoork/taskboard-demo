import { useRef, useState } from 'react';
import styled from 'styled-components';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import ProfileMenuList from './ProfileMenuList';
import AppPopover from '../common/AppPopover';

const UserButton = styled.button`
  display: flex;
  border: 3px solid rgba(255, 255, 255, 0.01);
  border-radius: 2rem;

  &:hover {
    border: 3px solid rgba(255, 255, 255, 1);
  }

  img {
    border-radius: 1rem;
  }
`;

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
