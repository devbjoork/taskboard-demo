import { Icon } from '@iconify/react';
import { useContext, useRef, useState } from 'react';

import AppPopover from '@/components/common/AppPopover';
import LabelItem from '@/components/LabelItem/LabelItem';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { BoardIdContext } from '@/pages/board/BoardPage';
import { useGetBoardByIdQuery } from '@/services/bff/boards.api';
import { useCreateLabelMutation } from '@/services/bff/labels.api';
import { LabelState } from '@/services/bff/types';

import { CreateLabelButton, LabelsButton, LabelsContainer, LabelsControls } from './CardLabelsButton.styled';

interface CardLabelsButtonProps {
  activeLabels: LabelState[];
  cardId: string;
}

const CardLabelsButton: React.FC<CardLabelsButtonProps> = ({ activeLabels, cardId }) => {
  const [popoverVisible, setPopoverVisible] = useState(false);

  const popoverRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const boardId = useContext(BoardIdContext);
  const { currentData } = useGetBoardByIdQuery(boardId);
  const [createLabel] = useCreateLabelMutation();

  useOnClickOutside(popoverRef, () => setPopoverVisible(false));

  const isLabelAcitve = (labelId: string) => {
    const label = activeLabels.find((l) => l._id === labelId);
    return label ? true : false;
  };

  return (
    <>
      <LabelsButton ref={buttonRef} onClick={() => setPopoverVisible(true)}>
        <Icon icon="ic:round-label" height={21} />
        Labels
      </LabelsButton>

      {popoverVisible && (
        <AppPopover ref={popoverRef} title="Labels" anchorRef={buttonRef} gap={12} horizontal="start" handleClose={() => setPopoverVisible(false)}>
          <LabelsContainer>
            {currentData &&
              currentData.labels.map((label) => {
                return (
                  <LabelItem
                    key={label._id}
                    id={label._id}
                    boardId={boardId}
                    cardId={cardId}
                    color={label.color}
                    textColor={label.textColor}
                    title={label.title}
                    active={isLabelAcitve(label._id)}
                  />
                );
              })}
            <LabelsControls>
              <CreateLabelButton onClick={() => createLabel({ boardId })}>
                <Icon icon="material-symbols:new-label-outline" />
                Create Label
              </CreateLabelButton>
            </LabelsControls>
          </LabelsContainer>
        </AppPopover>
      )}
    </>
  );
};

export default CardLabelsButton;
