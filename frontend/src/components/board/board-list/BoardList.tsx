import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BoardsHeading,
  ListContainer,
  NewBoardButton,
} from './BoardList.styled';
import { Board } from '../../../services/bff/types';
import BoardItem from '../board-item/BoardItem';
import { useCreateBoardMutation } from '../../../services/bff/boards.api';
import NewBoardModal from '../../NewBoardModal';

interface BoardListProps {
  boards: Board[];
  title: string;
  canCreate?: boolean;
}

const BoardList: React.FC<BoardListProps> = ({
  boards,
  title,
  canCreate = false,
}) => {
  const navigate = useNavigate();
  const [newModalVisible, setNewModalVisible] = useState(false);
  const [createBoard] = useCreateBoardMutation();

  const handleCreateBoard = async (createPayload: any) => {
    const res: any = await createBoard(createPayload);
    navigate(`/board/${res.data._id}`);
  };

  return (
    <>
      {(canCreate || boards.length > 0) && (
        <div>
          <BoardsHeading>{title}</BoardsHeading>
          <ListContainer>
            {boards.map((board: any) => {
              return (
                <BoardItem
                  key={board._id}
                  id={board._id}
                  title={board.title}
                  isStarred={board.starred}
                />
              );
            })}

            {canCreate && (
              <NewBoardButton onClick={() => setNewModalVisible(true)}>
                Create board
              </NewBoardButton>
            )}

            {newModalVisible && (
              <NewBoardModal
                handleClose={() => setNewModalVisible(false)}
                handleCreate={handleCreateBoard}
              />
            )}
          </ListContainer>
        </div>
      )}
    </>
  );
};

export default BoardList;
