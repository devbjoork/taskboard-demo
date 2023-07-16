import { Editor } from '@tinymce/tinymce-react';
import { Markup } from 'interweave';
import { useContext, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { BoardIdContext } from '@/contexts/BoardIdContext';
import { CardIdContext } from '@/contexts/CardIdContext';
import { useDeleteCommentMutation, useEditCommentMutation } from '@/services/bff/cards.api';
import { ActionState, UserData } from '@/services/bff/types';
import { RootState } from '@/store/store';

// import { ActionContainer, ActionHeader, ButtonGroup, Comment, CommentControls, CommentLayout, EditedMark, ProfileThumb } from './CardComment.styled';
import * as S from './CardComment.styled';

type CardCommentProps = {
  action: ActionState;
  users: UserData[];
};

const CardComment: React.FC<CardCommentProps> = ({ action, users }) => {
  const [isEditing, setIsEditing] = useState(false);
  const user = useSelector((state: RootState) => state.userCreds);
  const editorRef = useRef<any>(null);

  const boardId = useContext(BoardIdContext);
  const cardId = useContext(CardIdContext);

  const [deleteComment] = useDeleteCommentMutation();
  const [editComment] = useEditCommentMutation();

  const getCurrentContent = () => {
    return editorRef.current.getContent();
  };

  const getUserProfileThumb = (uid: string) => {
    const user = users.find((u) => u.uid === uid);
    return user ? user.photoURL : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2ug8ZaPulAPsPhZ5M3d5rPG9TZtxPW0qaslaX7Ts&s';
  };

  const getUserNameByUID = (uid: string) => {
    const user = users.find((u) => u.uid === uid);
    return user ? user.displayName : 'noname';
  };

  const getActionTime = (dateString: Date) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
  };

  const deleteOwnComment = async (actionId: string) => {
    await deleteComment({ boardId, cardId, commentId: actionId });
  };

  const saveChangedComment = async () => {
    const newContent = getCurrentContent();
    await editComment({ boardId, cardId, commentId: action._id, commentBody: newContent });
    setIsEditing(false);
  };

  return (
    <S.ActionContainer>
      <S.ProfileThumb src={getUserProfileThumb(action.userUID)} alt="" />
      <S.CommentLayout>
        <S.ActionHeader>
          <strong>{getUserNameByUID(action.userUID)}</strong>
          {action.payload.modified && <S.EditedMark>edited</S.EditedMark>}
          <div>{getActionTime(action.actionDateTime)}</div>
        </S.ActionHeader>
        {isEditing ? (
          <>
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
              initialValue={action.payload.commentBody}
              onInit={(e, editor) => (editorRef.current = editor)}
            />
            <S.ButtonGroup>
              <button onClick={saveChangedComment}>Save</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </S.ButtonGroup>
          </>
        ) : (
          <>
            <S.Comment>
              <Markup content={action.payload.commentBody} />
            </S.Comment>
            {action.userUID === user.uid && (
              <S.CommentControls>
                <button onClick={() => setIsEditing(true)}>Edit</button>
                <button onClick={() => deleteOwnComment(action._id)}>Delete</button>
              </S.CommentControls>
            )}
          </>
        )}
      </S.CommentLayout>
    </S.ActionContainer>
  );
};

export default CardComment;
