import React, { useState } from 'react';
import {
  BoardsHeading,
  ListContainer,
  NewBoardButton,
} from './BoardList.styled';
import { Board } from '../../../services/bff/types';
import BoardItem from '../BoardItem/BoardItem';
import NewBoardModal from '../NewBoardModal/NewBoardModal';

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
  const [newModalVisible, setNewModalVisible] = useState(false);

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
              <NewBoardModal handleClose={() => setNewModalVisible(false)} />
            )}
          </ListContainer>
        </div>
      )}
    </>
  );
};

export default BoardList;
