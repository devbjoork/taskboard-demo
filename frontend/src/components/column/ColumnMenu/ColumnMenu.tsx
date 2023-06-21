import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';

import AppPopover from '@/components/common/AppPopover';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';

import { ColumnMenuButton, ColumnPopoverMenu, MenuButton } from './ColumnMenu.styled';

interface ColumnMenuProps {
  deleteHandler: () => void;
  createHandler: () => void;
}

const ColumnMenu: React.FC<ColumnMenuProps> = ({ deleteHandler, createHandler }) => {
  const [popoverVisible, setPopoverVisible] = useState(false);
  const popoverRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useOnClickOutside(popoverRef, () => setPopoverVisible(false));

  return (
    <>
      <MenuButton ref={buttonRef} onClick={() => setPopoverVisible(true)}>
        <Icon icon="uil:ellipsis-h" height={20} />
      </MenuButton>
      {popoverVisible && (
        <AppPopover ref={popoverRef} anchorRef={buttonRef} gap={12} title="Manage Column" handleClose={() => setPopoverVisible(false)}>
          <ColumnPopoverMenu>
            <ColumnMenuButton
              onClick={() => {
                createHandler();
                setPopoverVisible(false);
              }}
            >
              Add a card
            </ColumnMenuButton>
            <ColumnMenuButton onClick={() => deleteHandler()}>Delete</ColumnMenuButton>
          </ColumnPopoverMenu>
        </AppPopover>
      )}
    </>
  );
};

export default ColumnMenu;
