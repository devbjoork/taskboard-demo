import {
  forwardRef,
  ReactNode,
  RefObject,
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';

const PopoverContainer = styled.div`
  position: fixed;
  display: flex;
  background-color: #fff;
  border-radius: 0.25rem;
  color: #111;
`;

type JustifyH = 'start' | 'end';

interface PopoverProps {
  children: ReactNode;
  anchorRef: RefObject<HTMLElement>;
  horizontal?: JustifyH;
  gap?: number;
}

const POPOVER_GAP_PX = 10;

const AppPopover = forwardRef<HTMLElement, PopoverProps>(
  (
    { children, anchorRef, gap = POPOVER_GAP_PX, horizontal = 'start' },
    ref: any
  ) => {
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
      const left =
        horizontal === 'end'
          ? anchorRect.x - selfRect.width + anchorRect.width
          : anchorRect.x;
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
        {children}
      </PopoverContainer>
    );
  }
);

export default AppPopover;
