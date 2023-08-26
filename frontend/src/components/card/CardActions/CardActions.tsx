import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { ActionState, UserData } from '@/services/bff/types';
import { RootState } from '@/store/store';

import CardAction from '../CardAction/CardAction';
import CardComment from '../CardComment/CardComment';
import CardNewComment from '../CardNewComment/CardNewComment';
import {
  ActionsContainer,
  ActionsHeader,
  DetailsButton,
  HeaderGroup,
} from './CardActions.styled';

type CardActionsProps = {
  actions: ActionState[];
  users: UserData[];
};

const CardActions: React.FC<CardActionsProps> = ({ actions, users }) => {
  const [isDetailed, setIsDetailed] = useState(false);
  const user = useSelector((state: RootState) => state.userCreds);

  const toggleDetails = async () => {
    setIsDetailed(!isDetailed);
  };

  return (
    <ActionsContainer>
      <ActionsHeader>
        <HeaderGroup>
          <Icon icon="carbon:data-2" height={24} />
          <div>Actions</div>
        </HeaderGroup>
        <HeaderGroup>
          <DetailsButton onClick={toggleDetails}>
            {isDetailed ? 'Hide Details' : 'Show Details'}
          </DetailsButton>
        </HeaderGroup>
      </ActionsHeader>

      <CardNewComment user={user} />

      {[...actions].reverse().map((action) => (
        <>
          {action.type === 'comment' && (
            <CardComment action={action} users={users} />
          )}
          {isDetailed && action.type !== 'comment' && (
            <CardAction action={action} users={users} />
          )}
        </>
      ))}
    </ActionsContainer>
  );
};

export default CardActions;
