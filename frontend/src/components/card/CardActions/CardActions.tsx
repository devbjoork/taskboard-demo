import { Icon } from '@iconify/react';
import { Editor } from '@tinymce/tinymce-react';
import { Markup } from 'interweave';
import { useContext, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { BoardIdContext } from '@/contexts/BoardIdContext';
import { CardIdContext } from '@/contexts/CardIdContext';
import { useAddCommentMutation } from '@/services/bff/cards.api';
import { ActionState, UserData } from '@/services/bff/types';
import { RootState } from '@/store/store';

import {
  ActionContainer,
  ActionHeader,
  ActionLayout,
  ActionsContainer,
  ActionsHeader,
  ActionTimeStamp,
  Comment,
  CommentControls,
  CommentLayout,
  DetailsButton,
  HeaderGroup,
  NewComment,
  NewCommentControls,
  ProfileThumb,
} from './CardActions.styled';

type CardActionsProps = {
  actions: ActionState[];
  users: UserData[];
};

const CardActions: React.FC<CardActionsProps> = ({ actions, users }) => {
  const [isDetailed, setIsDetailed] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const editorRef = useRef<any>(null);

  const boardId = useContext(BoardIdContext);
  const cardId = useContext(CardIdContext);

  const user = useSelector((state: RootState) => state.userCreds);
  const [addComment] = useAddCommentMutation();

  const getUserNameByUID = (uid: string) => {
    const user = users.find((u) => u.uid === uid);
    return user ? user.displayName : 'noname';
  };

  const getUserProfileThumb = (uid: string) => {
    const user = users.find((u) => u.uid === uid);
    return user ? user.photoURL : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2ug8ZaPulAPsPhZ5M3d5rPG9TZtxPW0qaslaX7Ts&s';
  };

  const getActionTime = (dateString: Date) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
  };

  const getCurrentContent = () => {
    return editorRef.current.getContent();
  };

  const saveComment = async () => {
    const newContent = getCurrentContent();
    console.log(newContent);
    await addComment({ boardId, cardId, commentBody: newContent });
    setIsCommenting(false);
  };

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
          <DetailsButton onClick={toggleDetails}>{isDetailed ? 'Hide Details' : 'Show Details'}</DetailsButton>
        </HeaderGroup>
      </ActionsHeader>

      <ActionContainer>
        <ProfileThumb src={user.photoURL} alt="" />
        {isCommenting ? (
          <NewComment>
            <Editor
              apiKey="pyg8bxxkf8nzx7g42jwhsbre9p1ls85z625lksaam7259use"
              init={{
                menubar: false,
                branding: false,
                resize: false,
                // inline: true,
                toolbar: 'undo redo | styleselect | forecolor backcolor | bold italic | bullist numlist | table | link image',
                plugins: 'advlist table textcolor lists link image',
                contextmenu: 'link image table',
                height: 200,
              }}
              initialValue=""
              onInit={(e, editor) => (editorRef.current = editor)}
            />
            <NewCommentControls>
              <button onClick={saveComment}>Save</button>
              <button onClick={() => setIsCommenting(false)}>Close</button>
            </NewCommentControls>
          </NewComment>
        ) : (
          <Comment onClick={() => setIsCommenting(true)}>Write a comment</Comment>
        )}
      </ActionContainer>

      {[...actions].reverse().map((action) => (
        <>
          {isDetailed && (
            <>
              {action.type === 'card-create' && (
                <ActionContainer>
                  <ProfileThumb src={getUserProfileThumb(action.userUID)} alt="" />
                  <ActionLayout key={action._id}>
                    <ActionHeader>
                      <strong>{getUserNameByUID(action.userUID)}</strong>
                      <div>created this card</div>
                    </ActionHeader>
                    <ActionTimeStamp>{getActionTime(action.actionDateTime)}</ActionTimeStamp>
                  </ActionLayout>
                </ActionContainer>
              )}

              {action.type === 'card-edit-title' && (
                <ActionContainer>
                  <ProfileThumb src={getUserProfileThumb(action.userUID)} alt="" />
                  <ActionLayout key={action._id}>
                    <ActionHeader>
                      <strong>{getUserNameByUID(action.userUID)}</strong>
                      <div>
                        changed title <strong>{action.payload.oldTitle}</strong> to <strong>{action.payload.newTitle}</strong>
                      </div>
                    </ActionHeader>
                    <ActionTimeStamp>{getActionTime(action.actionDateTime)}</ActionTimeStamp>
                  </ActionLayout>
                </ActionContainer>
              )}
            </>
          )}

          {action.type === 'comment' && (
            <ActionContainer>
              <ProfileThumb src={getUserProfileThumb(action.userUID)} alt="" />
              <CommentLayout>
                <ActionHeader>
                  <strong>{getUserNameByUID(action.userUID)}</strong>
                  <div>{getActionTime(action.actionDateTime)}</div>
                </ActionHeader>
                <Comment>
                  <Markup content={action.payload.commentBody} />
                </Comment>
                <CommentControls>
                  <button>Edit</button>
                  <button>Delete</button>
                </CommentControls>
              </CommentLayout>
            </ActionContainer>
          )}
        </>
      ))}
    </ActionsContainer>
  );
};

export default CardActions;
