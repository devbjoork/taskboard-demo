import { useContext, useRef, useState } from 'react';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';
import {
  CreateLabelButton,
  LabelsButton,
  LabelsContainer,
  LabelsControls,
} from './CardLabelsButton.styled';
import { Icon } from '@iconify/react';
import AppPopover from '../../common/AppPopover';
import { BoardIdContext } from '../../../pages/board/BoardPage';
import { useGetBoardByIdQuery } from '../../../services/bff/boards.api';
import LabelItem from '../../LabelItem/LabelItem';
import { Label } from '../../../services/bff/types';
import { useCreateLabelMutation } from '../../../services/bff/labels.api';

interface CardLabelsButtonProps {
  activeLabels: Label[];
  cardId: string;
  columnId: string;
}

const CardLabelsButton: React.FC<CardLabelsButtonProps> = ({
  activeLabels,
  cardId,
  columnId,
}) => {
  const [popoverVisible, setPopoverVisible] = useState(false);

  const popoverRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLElement>(null);

  const boardId = useContext(BoardIdContext);
  const { currentData, isFetching } = useGetBoardByIdQuery(boardId);
  const [createLabel] = useCreateLabelMutation();

  useOnClickOutside(popoverRef, () => setPopoverVisible(false));

  const isLabelAcitve = (labelId: string) => {
    const label = activeLabels.find((l) => l._id === labelId);
    return label ? true : false;
  };

  return (
    <>
      <LabelsButton
        onClick={() => setPopoverVisible(true)}
        ref={buttonRef as any}
      >
        <Icon icon="ic:round-label" height={21} />
        Labels
      </LabelsButton>

      {popoverVisible && (
        <AppPopover
          title="Labels"
          ref={popoverRef}
          anchorRef={buttonRef}
          gap={12}
          horizontal="start"
        >
          <LabelsContainer>
            {currentData &&
              currentData.labels.map((label) => {
                return (
                  <LabelItem
                    id={label._id}
                    key={label._id}
                    boardId={boardId}
                    cardId={cardId}
                    columnId={columnId}
                    color={label.color}
                    textColor={label.textColor}
                    name={label.name}
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
