import { useContext } from 'react';
import { BoardIdContext } from '@/pages/board/BoardPage';
import { useGetBoardByIdQuery } from '@/services/bff/boards.api';
import { ParticipantsHeading, ParticipantsContainer, ParticipantsBlock } from './CardParticipantList.styled';

const CardParticipantList: React.FC<any> = ({ participants }) => {
  const boardId = useContext(BoardIdContext);
  const { currentData } = useGetBoardByIdQuery(boardId);
  console.log(participants);

  const assignedUsers = currentData && currentData.userData.filter((user) => participants.includes(user.uid));

  return (
    <>
      {participants && participants.length > 0 && <ParticipantsHeading>Participants</ParticipantsHeading>}

      {assignedUsers && (
        <ParticipantsContainer>
          {assignedUsers.map((user) => {
            return (
              <ParticipantsBlock key={user.uid}>
                <img src={user.photoURL} title={`${user.displayName} (${user.email})`} />
              </ParticipantsBlock>
            );
          })}
        </ParticipantsContainer>
      )}
    </>
  );
};

export default CardParticipantList;
