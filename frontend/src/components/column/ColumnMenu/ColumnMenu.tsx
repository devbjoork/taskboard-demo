import { useState, useRef } from 'react';
import { Icon } from '@iconify/react';
import AppPopover from '@/components/common/AppPopover';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { MenuButton, ColumnPopoverMenu } from './ColumnMenu.styled';

const ColumnMenu: React.FC<{ deleteHandler: any; createHandler: any }> = ({ deleteHandler, createHandler }) => {
  const [popoverVisible, setPopoverVisible] = useState(false);
  const popoverRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLElement>(null);

  useOnClickOutside(popoverRef, () => setPopoverVisible(false));

  return (
    <>
      <MenuButton onClick={() => setPopoverVisible(true)} ref={buttonRef as any}>
        <Icon icon="uil:ellipsis-h" height={20} />
      </MenuButton>
      {popoverVisible && (
        <AppPopover ref={popoverRef} anchorRef={buttonRef} gap={12} title="Manage Column" handleClose={() => setPopoverVisible(false)}>
          <ColumnPopoverMenu>
            <ul>
              <li
                onClick={() => {
                  createHandler();
                  setPopoverVisible(false);
                }}
              >
                Add a card...
              </li>
              <li onClick={() => deleteHandler()}>Delete...</li>
            </ul>
          </ColumnPopoverMenu>
        </AppPopover>
      )}
    </>
  );
};

export default ColumnMenu;
