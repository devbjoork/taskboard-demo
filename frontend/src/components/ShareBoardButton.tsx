import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import AppPopover from './common/AppPopover';
import { useOnClickOutside } from '../hooks/useOnClickOutside';
import { useShareBoardMutation } from '../services/bff/boards.api';

export const ButtonShare = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-left: 1rem;
  padding: 0.25rem 1rem;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  background-color: rgba(255, 255, 255, 0.15);
  svg {
    font-size: 17px;
  }
  &:hover {
    background-color: rgba(255, 255, 255, 0.25);
  }
`;

const ShareContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  width: 340px;
`;

const ShareInfo = styled.div`
  font-weight: normal;
  font-size: 0.8rem;
`;

const ShareInput = styled.input`
  margin-top: 0.25rem;
  padding: 0.5rem;

  &:focus {
    outline: 1px solid #3e98e7;
  }
`;

const ShareControls = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-top: 0.5rem;
`;

const ShareSubmitButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;

  &:hover {
    background-color: #e7e7e7;
  }

  &:focus {
    outline: 1px solid #3e98e7;
  }
`;

const ShareBoardButton: React.FC<any> = ({ boardId }) => {
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [email, setEmail] = useState('');
  const popoverRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLElement>(null);

  const [shareBoard] = useShareBoardMutation();

  useOnClickOutside(popoverRef, () => setPopoverVisible(false));

  const share = async () => {
    let emailList = email.split(',');
    await shareBoard({
      id: boardId,
      emailList: emailList.map((email) => {
        return email.trim();
      }),
    });

    setEmail('');
    setPopoverVisible(false);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setEmail('');
      setPopoverVisible(false);
    }
  };

  return (
    <>
      <ButtonShare
        onClick={() => {
          setPopoverVisible(true);
        }}
        ref={buttonRef as any}
      >
        <Icon icon="typcn:user-add" />
        Share
      </ButtonShare>
      {popoverVisible && (
        <AppPopover
          ref={popoverRef}
          anchorRef={buttonRef}
          gap={12}
          horizontal="end"
        >
          <ShareContainer>
            <ShareInfo>
              Enter an email or comma separated list of emails here:
            </ShareInfo>
            <ShareInput
              type="text"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyUp={handleKeyUp}
            />
            <ShareControls>
              <ShareSubmitButton onClick={share}>Send</ShareSubmitButton>
            </ShareControls>
          </ShareContainer>
        </AppPopover>
      )}
    </>
  );
};

export default ShareBoardButton;
