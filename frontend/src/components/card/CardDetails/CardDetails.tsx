import { Icon } from '@iconify/react';
import { Editor } from '@tinymce/tinymce-react';
import { Markup } from 'interweave';
import { useContext, useRef, useState } from 'react';
import { Editor as TinyMCEEditor } from 'tinymce';

import { CardIdContext } from '@/contexts/CardIdContext';
import { useUpdateCardMutation } from '@/services/bff/cards.api';

import { DetailsBody, DetailsContainer, DetailsHeader, HeaderButton, HeaderGroup } from './CardDetails.styled';

interface CardDetailsProps {
  content: string;
}

const CardDetails: React.FC<CardDetailsProps> = ({ content }) => {
  const cardId = useContext(CardIdContext);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const editorRef = useRef<TinyMCEEditor | null>(null);

  const [updateCard] = useUpdateCardMutation();

  const getCurrentContent = (): string => {
    return editorRef.current ? editorRef.current.getContent() : '';
  };

  const saveDetails = async () => {
    const newContent = getCurrentContent();
    if (newContent != content) {
      await updateCard({ cardId: cardId, body: { body: newContent } });
    }
    setIsEditing(false);
  };

  return (
    <DetailsContainer>
      <DetailsHeader>
        <HeaderGroup>
          <Icon icon="carbon:chart-marimekko" height={24} />
          Details
        </HeaderGroup>
        <HeaderGroup>
          {isEditing ? (
            <>
              <HeaderButton onClick={() => setIsEditing(false)}>Cancel</HeaderButton>
              <HeaderButton isConfirm={true} onClick={saveDetails}>
                Save
              </HeaderButton>
            </>
          ) : (
            <HeaderButton onClick={() => setIsEditing(true)}>Edit</HeaderButton>
          )}
        </HeaderGroup>
      </DetailsHeader>

      <DetailsBody>
        {isEditing ? (
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
            }}
            initialValue={content}
            onInit={(e, editor) => (editorRef.current = editor)}
          />
        ) : (
          <div>
            <Markup content={content} />
          </div>
        )}
      </DetailsBody>
    </DetailsContainer>
  );
};

export default CardDetails;
