import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';

const TitleContainer = styled.div``;

export interface AppEditableTitleProps {
  initialValue: string;
  handleSubmit: any;
}

const AppEditableTitle: React.FC<AppEditableTitleProps> = ({
  initialValue = '',
  handleSubmit,
}) => {
  const [title, setTitle] = useState('');
  const [lastTitle, setLastTitle] = useState('');
  const [isTitleEdit, setIsTitleEdit] = useState(false);
  const titleRef = useRef<HTMLElement>(null);

  useOnClickOutside(
    titleRef,
    () => {
      setIsTitleEdit(false);
      if (title !== lastTitle) handleSubmit(title);
    },
    []
  );

  useEffect(() => {
    setTitle(initialValue);
    setLastTitle(initialValue);
  }, [initialValue]);

  const isNewTitle = () => {
    return title === lastTitle;
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setTitle(lastTitle);
      setIsTitleEdit(false);
    }

    if (event.key === 'Enter') {
      setLastTitle(title);
      setIsTitleEdit(false);
      if (title !== lastTitle) handleSubmit(title);
    }
  };

  return (
    <TitleContainer ref={titleRef as any}>
      {isTitleEdit ? (
        <input
          type="text"
          value={title}
          autoFocus
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => setTitle(e.target.value)}
          onKeyUp={handleKeyUp}
        />
      ) : (
        <div onClick={() => setIsTitleEdit(true)}>{title}</div>
      )}
    </TitleContainer>
  );
};

export default AppEditableTitle;
