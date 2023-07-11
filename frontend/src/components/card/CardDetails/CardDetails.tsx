import { Editor } from '@tinymce/tinymce-react';
import { Interweave } from 'interweave';
import { useRef, useState } from 'react';
import { DetailsContainer } from './CardDetails.styled';

const CardDetails = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const editorRef = useRef<any>(null);

  const testStr = `<h1>Hello there</h1>
    <p>You are seeing this</p>
    <p>while im not</p>
    <div><strong>This has to be something</strong></div>
    <div style="text-align: right;"><strong>Right align here</strong></div>
    <div style="text-align: center;"><strong>Center here</strong></div>
    <div style="text-align: left;"><em><strong>Left here</strong></em></div>
    <img src="https://platinumlist.net/guide/wp-content/uploads/2023/03/8359_img_worlds_of_adventure-big1613913137.jpg-1024x683.webp" height="100"/>`;

  const getCurrentContent = () => {
    console.log(editorRef.current.getContent());
  };

  console.log(isEditing);
  return (
    <DetailsContainer>
      <p>Details:</p>
      {!isEditing && <button onClick={() => setIsEditing(true)}>Edit</button>}
      <hr />

      {isEditing ? (
        <Editor
          apiKey="pyg8bxxkf8nzx7g42jwhsbre9p1ls85z625lksaam7259use"
          init={{ menubar: false, branding: false, height: 500, resize: false }}
          initialValue={testStr}
          onInit={(e, editor) => (editorRef.current = editor)}
        />
      ) : (
        <div>
          <Interweave onClick={() => console.log('hey')} content={testStr} />
        </div>
      )}

      <button onClick={getCurrentContent}>Log editor content</button>
      <button onClick={() => setIsEditing(false)}>Cancel</button>
      <button>Save</button>
    </DetailsContainer>
  );
};

export default CardDetails;
