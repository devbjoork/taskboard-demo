import { Icon } from '@iconify/react';
import {
  ParticipantImage,
  ParticipantsButton,
  ParticipantsContainer,
  ParticipantsHeading,
  UserButton,
  UserDataGroup,
} from './CardParticipantsButton.styled';
import { useContext, useRef, useState } from 'react';
import AppPopover from '../../common/AppPopover';
import { BoardIdContext } from '../../../pages/board/BoardPage';
import { useGetBoardByIdQuery } from '../../../services/bff/boards.api';

const CardParticipantsButton: React.FC<any> = ({cardId}) => {
  const [popoverVisible, setPopoverVisible] = useState(false);

  const popoverRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLElement>(null);

  const boardId = useContext(BoardIdContext);
  const { currentData, isFetching } = useGetBoardByIdQuery(boardId);

  const toggleParticipant = (user: any) => {

  }

  return (
    <>
      <ParticipantsButton
        onClick={() => setPopoverVisible(true)}
        ref={buttonRef as any}
      >
        <Icon icon="ic:round-person" height={21} />
        Participants
      </ParticipantsButton>

      {popoverVisible && (
        <AppPopover
          title="Participants"
          ref={popoverRef}
          anchorRef={buttonRef}
          gap={8}
          horizontal="start"
        >
          <ParticipantsContainer>
            <ParticipantsHeading>Board participants</ParticipantsHeading>

            {currentData &&
              currentData.userData.map((user) => {
                return (
                  <UserButton onClick={() => toggleParticipant(user)} title={`${user.displayName} (${user.email})`}>
                    <UserDataGroup>
                      <ParticipantImage src={user.photoURL} />{' '}
                      {user.displayName}
                    </UserDataGroup>
                    <Icon icon="charm:tick" />
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
