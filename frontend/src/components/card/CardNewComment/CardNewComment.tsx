import { Editor } from '@tinymce/tinymce-react';
import { useContext, useRef, useState } from 'react';

import { BoardIdContext } from '@/contexts/BoardIdContext';
import { CardIdContext } from '@/contexts/CardIdContext';
import { useAddCommentMutation } from '@/services/bff/cards.api';
import { UserCredsState } from '@/store/userCredsSlice';

import { ActionContainer, Comment, NewComment, NewCommentControls, ProfileThumb } from './CardNewComment.styled';

type CardNewCommentProps = {
  user: UserCredsState;
};

const CardNewComment: React.FC<CardNewCommentProps> = ({ user }) => {
  const [isCommenting, setIsCommenting] = useState(false);
  const [addComment] = useAddCommentMutation();

  const boardId = useContext(BoardIdContext);
  const cardId = useContext(CardIdContext);

  const editorRef = useRef<any>(null);

  const getCurrentContent = () => {
    return editorRef.current.getContent();
  };

  const saveComment = async () => {
    const newContent = getCurrentContent();
    console.log(newContent);
    await addComment({ boardId, cardId, commentBody: newContent });
    setIsCommenting(false);
  };

  return (
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
  );
};

export default CardNewComment;
