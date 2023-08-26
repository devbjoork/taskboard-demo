import { Icon } from '@iconify/react';
import { useContext, useRef, useState } from 'react';

import AppPopover from '@/components/common/AppPopover';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { BoardIdContext } from '@/pages/board/BoardPage';
import { useGetBoardByIdQuery } from '@/services/bff/boards.api';
import {
  useAddAssigneeMutation,
  useRemoveAssigneeMutation,
} from '@/services/bff/cards.api';
import { UserData } from '@/services/bff/types';

import {
  ParticipantImage,
  ParticipantsButton,
  ParticipantsContainer,
  ParticipantsHeading,
  UserButton,
  UserDataGroup,
} from './CardParticipantsButton.styled';

interface CardParticipantsButtonProps {
  cardId: string;
  style?: 'normal' | 'add';
}

const CardParticipantsButton: React.FC<CardParticipantsButtonProps> = ({
  cardId,
  style = 'normal',
}) => {
  const [popoverVisible, setPopoverVisible] = useState(false);

  const popoverRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const boardId = useContext(BoardIdContext);
  const { currentData } = useGetBoardByIdQuery(boardId);
  const [addAssignee] = useAddAssigneeMutation();
  const [removeAssignee] = useRemoveAssigneeMutation();

  useOnClickOutside(popoverRef, () => setPopoverVisible(false));

  const card = currentData && currentData.cards.find((c) => c._id === cardId);
  const assigneeIds = card ? card.assignee : [];

  const toggleParticipant = (user: UserData) => {
    if (assigneeIds.includes(user.uid)) {
      removeAssignee({ boardId, cardId, assigneeId: user.uid });
    } else {
      addAssignee({ boardId, cardId, assigneeId: user.uid });
    }
  };

  return (
    <>
      {style === 'normal' && (
        <ParticipantsButton
          ref={buttonRef}
          onClick={() => setPopoverVisible(true)}
        >
          <Icon icon="ic:round-person" height={21} />
          Participants
        </ParticipantsButton>
      )}

      {style === 'add' && (
        <ParticipantsButton
          ref={buttonRef}
          isRound={true}
          onClick={() => setPopoverVisible(true)}
        >
          <Icon icon="mi:add" height={17} />
        </ParticipantsButton>
      )}

      {popoverVisible && (
        <AppPopover
          ref={popoverRef}
          title="Edit Participants"
          anchorRef={buttonRef}
          gap={8}
          horizontal="start"
          handleClose={() => setPopoverVisible(false)}
        >
          <ParticipantsContainer>
            <ParticipantsHeading>On this board</ParticipantsHeading>

            {currentData &&
              currentData.userData.map((user) => {
                return (
                  <UserButton
                    key={user.uid}
                    title={`${user.displayName} (${user.email})`}
                    onClick={() => toggleParticipant(user)}
                  >
                    <UserDataGroup>
                      <ParticipantImage src={user.photoURL} />{' '}
                      {user.displayName}
                    </UserDataGroup>

                    {assigneeIds.includes(user.uid) && (
                      <Icon icon="charm:tick" />
                    )}
                  </UserButton>
                );
              })}
          </ParticipantsContainer>
        </AppPopover>
      )}
    </>
  );
};

export default CardParticipantsButton;
