import { Icon } from '@iconify/react';
import {
  CreateLabelButton,
  DeleteButton,
  EditContainer,
  EditControls,
  EditSection,
  PaletteGridLayout,
  PaletteItem,
  SaveButton,
  SectionHeader,
  TitleInput,
} from './EditLabelButton.styled';
import { useContext, useRef, useState } from 'react';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';
import AppPopover from '../../common/AppPopover';
import {
  useDeleteLabelMutation,
  useEditLabelMutation,
} from '../../../services/bff/labels.api';
import { BoardIdContext } from '../../../pages/board/BoardPage';
import CardLabel from '../CardLabel/CardLabel';

const colorPalleteList = [
  { id: '1', color: '#baf3bc', textColor: '#005603', name: 'light green' },
  { id: '2', color: '#c4baf3', textColor: '#290ea7', name: 'light purple' },
  { id: '3', color: '#f3d8ba', textColor: '#8d4a00', name: 'light brown' },
  { id: '4', color: '#bae2f3', textColor: '#005d85', name: 'light blue' },
  { id: '5', color: '#f3baba', textColor: '#9b0000', name: 'light red' },

  { id: '6', color: '#6bf270', textColor: '#006204', name: 'green' },
  { id: '7', color: '#7f66f2', textColor: '#070028', name: 'purple' },
  { id: '8', color: '#eeb068', textColor: '#5c3200', name: 'brown' },
  { id: '9', color: '#5bc2ee', textColor: '#003850', name: 'blue' },
  { id: '10', color: '#ef5858', textColor: '#420000', name: 'red' },

  { id: '11', color: '#0c8710', textColor: '#f0fff0', name: 'deep green' },
  { id: '12', color: '#3712da', textColor: '#e1dbff', name: 'deep purple' },
  { id: '13', color: '#dd7d10', textColor: '#fff3e6', name: 'deep brown' },
  { id: '14', color: '#129edb', textColor: '#e4f7ff', name: 'deep blue' },
  { id: '15', color: '#e01212', textColor: '#ffdbdb', name: 'deep red' },

  { id: '16', color: '#e5f3ba', textColor: '#4c6400', name: 'light lime' },
  { id: '17', color: '#e0baf3', textColor: '#600091', name: 'light violet' },
  { id: '18', color: '#baf3df', textColor: '#006642', name: 'light coral' },
  { id: '19', color: '#f3bad7', textColor: '#870044', name: 'light pink' },
  { id: '20', color: '#f3e7ba', textColor: '#705900', name: 'light gold' },

  { id: '21', color: '#cef068', textColor: '#455c00', name: 'lime' },
  { id: '22', color: '#c05ef0', textColor: '#2e0044', name: 'violet' },
  { id: '23', color: '#58f1bc', textColor: '#00583a', name: 'coral' },
  { id: '24', color: '#ef4a9f', textColor: '#3e0020', name: 'pink' },
  { id: '25', color: '#edca4d', textColor: '#584500', name: 'gold' },

  { id: '26', color: '#547000', textColor: '#fbffef', name: 'deep lime' },
  { id: '27', color: '#a719ee', textColor: '#f6e4ff', name: 'deep violet' },
  { id: '28', color: '#01744c', textColor: '#d0ffef', name: 'deep coral' },
  { id: '29', color: '#7a0241', textColor: '#ffd5eb', name: 'deep pink' },
  { id: '30', color: '#816c05', textColor: '#fff8d6', name: 'deep gold' },
];

const EditLabelButton: React.FC<any> = ({ id, title, color }) => {
  const [popoverVisible, setPopoverVisible] = useState(false);

  const [labelTitle, setLabelTitle] = useState(title);
  const [paletteColor, setPaletteColor] = useState({
    id: '0',
    color: color,
    textColor: '#eee',
    name: '',
  });

  const [deleteLabel] = useDeleteLabelMutation();
  const [editLabel] = useEditLabelMutation();

  const boardId = useContext(BoardIdContext);

  const popoverRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLElement>(null);

  useOnClickOutside(popoverRef, () => setPopoverVisible(false));

  const saveLabel = async () => {
    editLabel({
      labelId: id,
      boardId,
      color: paletteColor.color,
      title: labelTitle,
      textColor: paletteColor.textColor,
      name: paletteColor.name,
    });
  };

  return (
    <>
      <CreateLabelButton
        onClick={() => setPopoverVisible(true)}
        ref={buttonRef as any}
      >
        <Icon icon="ph:pen-fill" height={16} />
      </CreateLabelButton>

      {popoverVisible && (
        <AppPopover
          title="Edit Label"
          ref={popoverRef}
          anchorRef={buttonRef}
          gap={12}
          horizontal="end"
          handleClose={() => setPopoverVisible(false)}
        >
          <EditContainer>
            <EditSection>
              <SectionHeader>Preview</SectionHeader>
              <CardLabel
                title={labelTitle}
                color={paletteColor.color}
                textColor={paletteColor.textColor}
                isExpanded={true}
              />
            </EditSection>
            <EditSection>
              <SectionHeader>Title</SectionHeader>
              <TitleInput
                type="text"
                value={labelTitle}
                onChange={(e) => setLabelTitle(e.target.value)}
              />
            </EditSection>
            <EditSection>
              <SectionHeader>Color</SectionHeader>
              <PaletteGridLayout>
                {colorPalleteList.map((color) => {
                  return (
                    <PaletteItem
                      key={color.id}
                      color={color.color}
                      title={color.name}
                      onClick={() => setPaletteColor(color)}
                      isActive={color.id === paletteColor.id}
                    ></PaletteItem>
                  );
                })}
              </PaletteGridLayout>
            </EditSection>
            <EditControls>
              <DeleteButton
                onClick={() => deleteLabel({ labelId: id, boardId })}
              >
                Delete
              </DeleteButton>
              <SaveButton onClick={saveLabel}>Save</SaveButton>
            </EditControls>
          </EditContainer>
        </AppPopover>
      )}
    </>
  );
};

export default EditLabelButton;
