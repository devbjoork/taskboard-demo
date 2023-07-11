import { useContext } from 'react';

import { BoardIdContext } from '@/pages/board/BoardPage';
import { useGetBoardByIdQuery } from '@/services/bff/boards.api';

import { ParticipantsBlock, ParticipantsContainer, ParticipantsHeading } from './CardParticipantList.styled';

interface CardParticipantListProps {
  participants: string[];
}

const CardParticipantList: React.FC<CardParticipantListProps> = ({ participants }) => {
  const boardId = useContext(BoardIdContext);
  const { currentData } = useGetBoardByIdQuery(boardId);

  const assignedUsers = currentData && currentData.userData.filter((user) => participants.includes(user.uid));

  return (
    <div>
      {participants && participants.length > 0 && <ParticipantsHeading>Participants</ParticipantsHeading>}

      {assignedUsers && (
        <ParticipantsContainer>
          {assignedUsers.map((user) => {
            return (
              <ParticipantsBlock key={user.uid}>
                <img src={user.photoURL} alt={user.displayName} title={`${user.displayName} (${user.email})`} />
              </ParticipantsBlock>
            );
          })}
        </ParticipantsContainer>
      )}
    </div>
  );
};

export default CardParticipantList;
