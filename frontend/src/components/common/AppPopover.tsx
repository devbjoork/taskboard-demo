import { forwardRef, ReactNode, RefObject, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';

const PopoverContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  z-index: 10;
  background-color: #fff;
  border-radius: 0.25rem;
  color: #111;
  box-shadow: 0px 0px 3px 0px #e3e3e3;
`;

const PopoverTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 2rem;
  border-bottom: 1px solid lightgray;
  margin: 1rem 1rem 0 1rem;
`;

const CloseButton = styled.button`
  display: flex;
  align-self: center;
  background: none;
  border: none;

  svg {
    color: grey;
  }
`;

type JustifyH = 'start' | 'end';

interface PopoverProps {
  children: ReactNode;
  title?: string;
  anchorRef: RefObject<HTMLElement>;
  horizontal?: JustifyH;
  gap?: number;
  handleClose: any;
}

const POPOVER_GAP_PX = 10;

const AppPopover = forwardRef<HTMLElement, PopoverProps>(
  ({ children, title = '', anchorRef, gap = POPOVER_GAP_PX, horizontal = 'start', handleClose }, ref: any) => {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ top: '', left: '' });

    useEffect(() => {
      if (anchorRef.current && ref) {
        const { top, left } = calculatePosition(anchorRef.current, ref.current);
        setPosition({ top, left });
        setVisible(true);
      }
    }, []);

    const calculatePosition = (anchor: HTMLElement, self: HTMLElement) => {
      const anchorRect = anchor.getBoundingClientRect();
      const selfRect = self.getBoundingClientRect();
      const left = horizontal === 'end' ? anchorRect.x - selfRect.width + anchorRect.width : anchorRect.x;
      const top = anchorRect.y + anchorRect.height + gap;

      return {
        top: `${top}px`,
        left: `${left}px`,
      };
    };

    return (
      <PopoverContainer
        ref={ref as any}
        style={{
          top: `${position.top}`,
          left: `${position.left}`,
          visibility: `${visible ? 'visible' : 'hidden'}`,
        }}
      >
        <PopoverTitle>
          {title}
          <CloseButton onClick={handleClose}>
            <Icon icon="mdi:close" height={17} />
          </CloseButton>
        </PopoverTitle>
        {children}
      </PopoverContainer>
    );
  }
);

export default AppPopover;
