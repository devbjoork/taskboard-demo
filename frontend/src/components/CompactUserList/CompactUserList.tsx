import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';

import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { useRemoveUserFromBoardMutation } from '@/services/bff/boards.api';
import { UserData } from '@/services/bff/types';

import AppPopover from '../common/AppPopover';
import {
  UserDetail,
  UserImage,
  UserListContainer,
  UserListDetails,
  UserMore,
  UserRow,
} from './CompactUserList.styled';

interface CompactUserListProps {
  users: UserData[];
  boardId: string;
}

const CompactUserList: React.FC<CompactUserListProps> = ({
  users,
  boardId,
}) => {
  const [popoverVisible, setPopoverVisible] = useState(false);
  const popoverRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const [removeUserFromBoard] = useRemoveUserFromBoardMutation();

  useOnClickOutside(popoverRef, () => setPopoverVisible(false));

  const removeUser = async (userUID: string) => {
    await removeUserFromBoard({ boardId, userUID });
  };

  return (
    <UserListContainer ref={buttonRef} onClick={() => setPopoverVisible(true)}>
      {users &&
        users.map((user: UserData) => {
          return (
            <UserImage
              key={user.uid}
              src={user.photoURL}
              height={28}
              title={user.displayName}
            ></UserImage>
          );
        })}

      {popoverVisible && (
        <AppPopover
          ref={popoverRef}
          anchorRef={buttonRef}
          gap={12}
          horizontal="end"
          title="Users of this board:"
          handleClose={() => setPopoverVisible(false)} // what, setting to true somehow
        >
          <UserListDetails>
            {users &&
              users.map((user: UserData) => {
                return (
                  <UserRow key={user.uid}>
                    <UserDetail>
                      <img
                        src={user.photoURL}
                        alt={user.displayName}
                        height={20}
                        width={20}
                      ></img>
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
