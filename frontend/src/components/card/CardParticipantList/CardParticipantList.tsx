import { useContext } from 'react';
import { useGetBoardByIdQuery } from '../../../services/bff/boards.api';
import {
  ParticipantsBlock,
  ParticipantsContainer,
  ParticipantsHeading,
} from './CardParticipantList.styled';
import { BoardIdContext } from '../../../pages/board/BoardPage';

const CardParticipantList: React.FC<any> = ({ participants }) => {
  const boardId = useContext(BoardIdContext);
  const { currentData } = useGetBoardByIdQuery(boardId);
  console.log(participants);

  const assignedUsers =
    currentData &&
    currentData.userData.filter((user) => participants.includes(user.uid));

  return (
    <>
      {participants && participants.length > 0 && (
        <ParticipantsHeading>Participants</ParticipantsHeading>
      )}

      {assignedUsers && (
        <ParticipantsContainer>
          {assignedUsers.map((user) => {
            return (
              <ParticipantsBlock key={user.uid}>
                <img
                  src={user.photoURL}
                  title={`${user.displayName} (${user.email})`}
                />
              </ParticipantsBlock>
            );
          })}
        </ParticipantsContainer>
      )}
    </>
  );
};

export default CardParticipantList;
