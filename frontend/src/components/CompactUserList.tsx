import { useRef, useState } from 'react';
import {
  UserDetail,
  UserImage,
  UserListContainer,
  UserListDetails,
  UserMore,
  UserRow,
} from './CompactUserList.styled';
import AppPopover from './common/AppPopover';
import { useOnClickOutside } from '../hooks/useOnClickOutside';
import { Icon } from '@iconify/react';
import { useRemoveUserFromBoardMutation } from '../services/bff/boards.api';

const CompactUserList: React.FC<any> = ({ users, boardId }) => {
  const [popoverVisible, setPopoverVisible] = useState(false);
  const popoverRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLElement>(null);
  const [removeUserFromBoard] = useRemoveUserFromBoardMutation();

  useOnClickOutside(popoverRef, () => setPopoverVisible(false));

  const removeUser = async (userUID: string) => {
    await removeUserFromBoard({ boardId, userUID });
    // setPopoverVisible(false);
  };

  return (
    <UserListContainer
      onClick={() => setPopoverVisible(true)}
      ref={buttonRef as any}
    >
      {users &&
        users.map((user: any) => {
          return (
            <UserImage
              key={user.uid}
              src={user.photoURL}
              height={28}
              title={user.displayName}
            ></UserImage>
          );
          // return <img src={user.photoURL} height={23} title={user.displayName}></img>;
        })}

      {popoverVisible && (
        <AppPopover
          ref={popoverRef}
          anchorRef={buttonRef}
          gap={12}
          horizontal="end"
        >
          <UserListDetails>
            <div>Users of this board:</div>
            {users &&
              users.map((user: any) => {
                return (
                  <UserRow>
                    <UserDetail>
                      <img src={user.photoURL} height={20} width={20}></img>
                      <div>{user.displayName}</div>
                    </UserDetail>
                    <UserMore>
                      <div>Participant</div>
                      <button onClick={() => removeUser(user.uid)}>
                        <Icon icon="uil:trash" height={13} />
                      </button>
                    </UserMore>
                  </UserRow>
                );
              })}
          </UserListDetails>
        </AppPopover>
      )}
    </UserListContainer>
  );
};

export default CompactUserList;
