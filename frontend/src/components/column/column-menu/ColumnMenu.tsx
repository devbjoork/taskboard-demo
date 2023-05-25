import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';
import AppPopover from '../../common/AppPopover';
import { ColumnPopoverMenu, MenuButton } from './ColumnMenu.styled';

const ColumnMenu: React.FC<{ deleteHandler: any; createHandler: any }> = ({
  deleteHandler,
  createHandler,
}) => {
  const [popoverVisible, setPopoverVisible] = useState(false);
  const popoverRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLElement>(null);

  useOnClickOutside(popoverRef, () => setPopoverVisible(false));

  return (
    <>
      <MenuButton
        onClick={() => setPopoverVisible(true)}
        ref={buttonRef as any}
      >
        <Icon icon="uil:ellipsis-h" style={{ fontSize: '16px' }} />
      </MenuButton>
      {popoverVisible && (
        <AppPopover ref={popoverRef} anchorRef={buttonRef} gap={12}>
          <ColumnPopoverMenu>
            <span>Manage column</span>
            <hr />
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
