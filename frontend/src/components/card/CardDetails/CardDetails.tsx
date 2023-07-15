import { Icon } from '@iconify/react';
import { Editor } from '@tinymce/tinymce-react';
import { Interweave, Markup } from 'interweave';
import { useContext, useRef, useState } from 'react';

import { CardIdContext } from '@/contexts/CardIdContext';
import { useUpdateCardMutation } from '@/services/bff/cards.api';

import { DetailsBody, DetailsContainer, DetailsHeader, HeaderButton, HeaderGroup } from './CardDetails.styled';

interface CardDetailsProps {
  content: string;
}

const CardDetails: React.FC<CardDetailsProps> = ({ content }) => {
  const cardId = useContext(CardIdContext);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const editorRef = useRef<any>(null);

  const [updateCard] = useUpdateCardMutation();

  // const testStr = `<h1>Hello there</h1>
  //   <p>You are seeing this</p>
  //   <p>while im not</p>
  //   <div><strong>This has to be something</strong></div>
  //   <div style="text-align: right;"><strong>Right align here</strong></div>
  //   <div style="text-align: center;"><strong>Center here</strong></div>
  //   <div style="text-align: left;"><em><strong>Left here</strong></em></div>
  //   <img src="https://platinumlist.net/guide/wp-content/uploads/2023/03/8359_img_worlds_of_adventure-big1613913137.jpg-1024x683.webp" height="100"/>`;

  // const testStr2 = `<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta, voluptatem. Qui nulla corporis harum voluptate, voluptatem saepe atque soluta omnis nisi provident ullam quos, necessitatibus maxime possimus quaerat, maiores tenetur?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta, voluptatem. Qui nulla corporis harum voluptate, voluptatem saepe atque soluta omnis nisi provident ullam quos, necessitatibus maxime possimus quaerat, maiores tenetur?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta, voluptatem. Qui nulla corporis harum voluptate, voluptatem saepe atque soluta omnis nisi provident ullam quos, necessitatibus maxime possimus quaerat, maiores tenetur?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta, voluptatem. Qui nulla corporis harum voluptate, voluptatem saepe atque soluta omnis nisi provident ullam quos, necessitatibus maxime possimus quaerat, maiores tenetur?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta, voluptatem. Qui nulla corporis harum voluptate, voluptatem saepe atque soluta omnis nisi provident ullam quos, necessitatibus maxime possimus quaerat, maiores tenetur?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta, voluptatem. Qui nulla corporis harum voluptate, voluptatem saepe atque soluta omnis nisi provident ullam quos, necessitatibus maxime possimus quaerat, maiores tenetur?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta, voluptatem. Qui nulla corporis harum voluptate, voluptatem saepe atque soluta omnis nisi provident ullam quos, necessitatibus maxime possimus quaerat, maiores tenetur?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta, voluptatem. Qui nulla corporis harum voluptate, voluptatem saepe atque soluta omnis nisi provident ullam quos, necessitatibus maxime possimus quaerat, maiores tenetur?<p>`;

  const getCurrentContent = () => {
    return editorRef.current.getContent();
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
