import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';

import AppPopover from '@/components/common/AppPopover';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { useShareBoardMutation } from '@/services/bff/boards.api';

import {
  ButtonShare,
  ShareContainer,
  ShareControls,
  ShareInfo,
  ShareInput,
  ShareSubmitButton,
} from './ShareBoardButton.styled';

interface ShareBoardButtonProps {
  boardId: string;
}

const ShareBoardButton: React.FC<ShareBoardButtonProps> = ({ boardId }) => {
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [email, setEmail] = useState('');
  const popoverRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [shareBoard] = useShareBoardMutation();

  useOnClickOutside(popoverRef, () => setPopoverVisible(false));

  const share = async () => {
    const emailList = email.split(',');
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
        ref={buttonRef}
        onClick={() => {
          setPopoverVisible(true);
        }}
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
          title="Share board"
          handleClose={() => setPopoverVisible(false)}
        >
          <ShareContainer>
            <ShareInfo>
              Enter an email or comma separated list of emails here:
            </ShareInfo>
            <ShareInput
              type="text"
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
