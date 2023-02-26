import React, { useState } from 'react';
import styled from 'styled-components';
import Card from './Card';
import { Icon } from '@iconify/react';
import AppButton from './ui/AppButton';
import { useChangeColumnTitleMutation, useDeleteColumnMutation } from '../services/columns.api';
import { useDispatch } from 'react-redux';
import { removeColumnFromCurrent, changeColumnTitle, ColumnState, addCardToColumn }  from '../store/boardsSlice';
import ReactDOM from 'react-dom';
import { useCreateCardMutation } from '../services/cards.api';

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  min-width: 250px;
  max-width: 250px;
  background-color: #fbfbfb;
  padding: 1rem;
  margin-left: 1rem;
  border-radius: 0.25rem;
  box-shadow: 0 1px 0 #b1b1b1;
`;

const ColumnHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  padding-left: 0.5rem;

  input {
    border: 2px solid #62b6ff;
    border-radius: 0.25rem;
    height: 21px;
    padding-left: 0.5rem;
  }
`;

const ColumnButtons = styled.div`
  display: flex;
`;

const NewCardButton = styled.button`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  padding: 0.3rem 1rem;
  line-height: 2rem;
  border: none;
  border-radius: 0.25rem;
  background-color: #f5f5f5;

  &:hover {
    background-color: #e7e7e7;
  }

  svg {
    height: 17px;
    margin-right: 0.25rem;
  }
`;

interface ColumnProps {
  id: string;
  title: string;
  items: any[];
}

const Column: React.FC<ColumnProps> = ({ id, title, items }) => {
  const [isTitleEdit, setIsTitleEdit] = useState(false);
  const [columnTitle, setColumnTItle] = useState(title);
  const [deleteMutation] = useDeleteColumnMutation();
  const [changeTitle] = useChangeColumnTitleMutation();
  const [createCard] = useCreateCardMutation();
  const dispatch = useDispatch();

  const handleDragStart = (e: any, card: any) => {
    console.log(e);
  };

  const deleteSelf = async () => {
    const result = await deleteMutation(id);
    dispatch(removeColumnFromCurrent(id));
  }

  const createEmptyCard = async () => {
    const result: any = await createCard({title: 'New card', columnId: id});
    dispatch(addCardToColumn({ columnId: id, card: result.data}));
  }

  const handleClickOutside = async (e: any) => {
    if (!isTitleEdit) return;
    const node = ReactDOM.findDOMNode(this);
    if (!node || !node.contains(e.target)) {
      setIsTitleEdit(false);
      const column: any = await changeTitle({id, title: columnTitle});
      dispatch(changeColumnTitle(column.title));
    }
  } 

  return (
    <ColumnContainer onClick={(e) => handleClickOutside(e)}
      draggable="true"
    >
      <ColumnHeader onClick={(e) => e.stopPropagation()}>
        { isTitleEdit ? 
          <input type="text" value={columnTitle} onChange={(e) => setColumnTItle(e.target.value)} /> :
          <div onClick={() => setIsTitleEdit(true)}>{columnTitle}</div>
        }
        {/* <div onClick={() => setIsTitleEdit(true)}>{title}</div> */}
        <button onClick={deleteSelf} style={{ border: 'none', background: 'none' }}>
          <Icon icon="uil:ellipsis-h" style={{ fontSize: '16px' }} />
        </button>
      </ColumnHeader>
      <div className="content">
        {items.map((item) => (
          <Card
            key={item._id}
            id={item._id}
            title={item.title}
            body={item.body}
            createdAt={item.createdAt}
            columnTitle={columnTitle}
            columnId={id}
            onDragStart={handleDragStart}
          />
        ))}
      </div>
      <ColumnButtons>
        <NewCardButton onClick={createEmptyCard}>
          <Icon icon="uil:plus" style={{ fontSize: '16px' }} />
          Add a card
        </NewCardButton>
      </ColumnButtons>
    </ColumnContainer>
  );
};

export default Column;
