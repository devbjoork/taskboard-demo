import { useState, useRef, useContext } from 'react';
import { Icon } from '@iconify/react';
import AppPopover from '@/components/common/AppPopover';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { BoardIdContext } from '@/pages/board/BoardPage';
import { useGetBoardByIdQuery } from '@/services/bff/boards.api';
import { useAddAssigneeMutation, useRemoveAssigneeMutation } from '@/services/bff/cards.api';
import { UserData } from '@/services/bff/types';
import { ParticipantsButton, ParticipantsContainer, ParticipantsHeading, UserButton, UserDataGroup, ParticipantImage } from './CardParticipantsButton.styled';

const CardParticipantsButton: React.FC<any> = ({ cardId }) => {
  const [popoverVisible, setPopoverVisible] = useState(false);

  const popoverRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLElement>(null);

  const boardId = useContext(BoardIdContext);
  const { currentData } = useGetBoardByIdQuery(boardId);
  const [addAssignee] = useAddAssigneeMutation();
  const [removeAssignee] = useRemoveAssigneeMutation();

  useOnClickOutside(popoverRef, () => setPopoverVisible(false));

  const card = currentData && currentData.cards.find((c) => c._id === cardId);
  const assigneeIds = card ? card.assignee : [];

  console.log(assigneeIds);

  const toggleParticipant = (user: UserData) => {
    if (assigneeIds.includes(user.uid)) {
      removeAssignee({ boardId, cardId, assigneeId: user.uid });
    } else {
      addAssignee({ boardId, cardId, assigneeId: user.uid });
    }
  };

  return (
    <>
      <ParticipantsButton onClick={() => setPopoverVisible(true)} ref={buttonRef as any}>
        <Icon icon="ic:round-person" height={21} />
        Participants
      </ParticipantsButton>

      {popoverVisible && (
        <AppPopover title="Edit Participants" ref={popoverRef} anchorRef={buttonRef} gap={8} horizontal="start" handleClose={() => setPopoverVisible(false)}>
          <ParticipantsContainer>
            <ParticipantsHeading>On this board</ParticipantsHeading>

            {currentData &&
              currentData.userData.map((user) => {
                return (
                  <UserButton key={user.uid} onClick={() => toggleParticipant(user)} title={`${user.displayName} (${user.email})`}>
                    <UserDataGroup>
                      <ParticipantImage src={user.photoURL} /> {user.displayName}
                    </UserDataGroup>

                    {assigneeIds.includes(user.uid) && <Icon icon="charm:tick" />}
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
