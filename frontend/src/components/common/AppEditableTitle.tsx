import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { useOnClickOutside } from '@/hooks/useOnClickOutside';

const TitleContainer = styled.div``;

const TitleBlock = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export interface AppEditableTitleProps {
  initialValue: string;
  handleSubmit: (title: string) => void;
}

const AppEditableTitle: React.FC<AppEditableTitleProps> = ({ initialValue = '', handleSubmit }) => {
  const [title, setTitle] = useState('');
  const [lastTitle, setLastTitle] = useState('');
  const [isTitleEdit, setIsTitleEdit] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);

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
    <TitleContainer ref={titleRef}>
      {isTitleEdit ? (
        <input type="text" value={title} onClick={(e) => e.stopPropagation()} onChange={(e) => setTitle(e.target.value)} onKeyUp={handleKeyUp} />
      ) : (
        <TitleBlock onClick={() => setIsTitleEdit(true)}>{title}</TitleBlock>
      )}
    </TitleContainer>
  );
};

export default AppEditableTitle;
