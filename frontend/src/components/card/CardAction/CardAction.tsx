import { ActionState, UserData } from '@/services/bff/types';

import { ActionContainer, ActionHeader, ActionLayout, ActionTimeStamp, ProfileThumb } from './CardAction.styled';

type CardActionProps = {
  action: ActionState;
  users: UserData[];
};

const CardAction: React.FC<CardActionProps> = ({ action, users }) => {
  const getUserProfileThumb = (uid: string) => {
    const user = users.find((u) => u.uid === uid);
    return user ? user.photoURL : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2ug8ZaPulAPsPhZ5M3d5rPG9TZtxPW0qaslaX7Ts&s';
  };

  const getActionTime = (dateString: Date) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
  };

  const getUserNameByUID = (uid: string) => {
    const user = users.find((u) => u.uid === uid);
    return user ? user.displayName : 'noname';
  };

  return (
    <ActionContainer>
      <ProfileThumb src={getUserProfileThumb(action.userUID)} alt="" />
      <ActionLayout key={action._id}>
        <ActionHeader>
          <strong>{getUserNameByUID(action.userUID)}</strong>
          {action.type === 'card-create' && <div>created this card</div>}
          {action.type === 'card-edit-title' && (
            <div>
              changed title to <strong>{action.payload.newTitle}</strong>
            </div>
          )}
        </ActionHeader>
        <ActionTimeStamp>{getActionTime(action.actionDateTime)}</ActionTimeStamp>
      </ActionLayout>
    </ActionContainer>
  );
};

export default CardAction;
