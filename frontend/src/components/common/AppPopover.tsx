import { Icon } from '@iconify/react';
import {
  ForwardedRef,
  forwardRef,
  MutableRefObject,
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useState,
} from 'react';

import {
  CloseButton,
  PopoverContainer,
  PopoverTitle,
} from './AppPopover.styled';

type JustifyH = 'start' | 'end';

interface PopoverProps {
  children: ReactNode;
  title?: string;
  anchorRef: RefObject<HTMLElement>;
  horizontal?: JustifyH;
  gap?: number;
  handleClose: () => void;
}

const POPOVER_GAP_PX = 10;

const AppPopover = forwardRef<HTMLElement, PopoverProps>(
  (
    {
      children,
      title = '',
      anchorRef,
      gap = POPOVER_GAP_PX,
      horizontal = 'start',
      handleClose,
    },
    ref: ForwardedRef<HTMLElement>
  ) => {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ top: '', left: '' });

    const calculatePosition = useCallback(
      (anchor: HTMLElement, self: HTMLElement) => {
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
      },
      [gap, horizontal]
    );

    useEffect(() => {
      if (anchorRef.current && ref) {
        const { top, left } = calculatePosition(
          anchorRef.current,
          (ref as MutableRefObject<HTMLElement>).current
        );
        setPosition({ top, left });
        setVisible(true);
      }
    }, [anchorRef, calculatePosition, ref]);

    return (
      <PopoverContainer
        ref={ref as RefObject<HTMLDivElement>}
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

AppPopover.displayName = 'AppPopover';

export default AppPopover;
