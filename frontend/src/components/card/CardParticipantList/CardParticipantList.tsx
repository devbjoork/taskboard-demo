import { useContext } from 'react';

import { CardIdContext } from '@/contexts/CardIdContext';
import { BoardIdContext } from '@/pages/board/BoardPage';
import { useGetBoardByIdQuery } from '@/services/bff/boards.api';

import CardParticipantsButton from '../CardParticipantsButton/CardParticipantsButton';
import {
  ParticipantsBlock,
  ParticipantsContainer,
  ParticipantsHeading,
  ParticipantsLayout,
} from './CardParticipantList.styled';

interface CardParticipantListProps {
  participants: string[];
}

const CardParticipantList: React.FC<CardParticipantListProps> = ({
  participants,
}) => {
  const boardId = useContext(BoardIdContext);
  const cardId = useContext(CardIdContext);
  const { currentData } = useGetBoardByIdQuery(boardId);

  const assignedUsers =
    currentData &&
    currentData.userData.filter((user) => participants.includes(user.uid));

  if (participants.length <= 0) return null;

  return (
    <ParticipantsLayout>
      <ParticipantsHeading>Participants</ParticipantsHeading>
      {assignedUsers && (
        <ParticipantsContainer>
          {assignedUsers.map((user) => {
            return (
              <ParticipantsBlock key={user.uid}>
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  title={`${user.displayName} (${user.email})`}
                />
              </ParticipantsBlock>
            );
          })}
          <CardParticipantsButton cardId={cardId} style="add" />
          {/* <ProfilePreview user={assignedUsers[0]} /> */}
        </ParticipantsContainer>
      )}
    </ParticipantsLayout>
  );
};

export default CardParticipantList;
