import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import AppPopover from '../../common/AppPopover';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';
import { useShareBoardMutation } from '../../../services/bff/boards.api';
import {
  ButtonShare,
  ShareContainer,
  ShareControls,
  ShareInfo,
  ShareInput,
  ShareSubmitButton,
} from './ShareBoardButton.styled';

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
          title='Share board'
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
