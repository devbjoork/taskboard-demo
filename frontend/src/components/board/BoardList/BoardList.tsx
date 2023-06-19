import React, { useEffect, useState } from 'react';
import { BoardsHeading, ListContainer, NewBoardButton } from './BoardList.styled';
import { Board } from '../../../services/bff/types';
import BoardItem from '../BoardItem/BoardItem';
import NewBoardModal from '../NewBoardModal/NewBoardModal';
import { useLazyGetThemesQuery } from '../../../services/bff/boards.api';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

interface BoardListProps {
  boards: Board[];
  title: string;
  canCreate?: boolean;
}

const BoardList: React.FC<BoardListProps> = ({ boards, title, canCreate = false }) => {
  const [newModalVisible, setNewModalVisible] = useState(false);
  const [getthemes, { data: themes = [] }] = useLazyGetThemesQuery();

  const token = useSelector((state: RootState) => state.userCreds.accessToken);
  useEffect(() => {
    if (token) getthemes();
  }, [token]);

  return (
    <>
      {(canCreate || boards.length > 0) && (
        <div>
          <BoardsHeading>{title}</BoardsHeading>
          <ListContainer>
            {boards.map((board: Board) => {
              return <BoardItem key={board._id} id={board._id} title={board.title} isStarred={board.starred} theme={board.themePrefs} />;
            })}

            {canCreate && <NewBoardButton onClick={() => setNewModalVisible(true)}>Create board</NewBoardButton>}

            {newModalVisible && <NewBoardModal handleClose={() => setNewModalVisible(false)} themeList={themes} />}
          </ListContainer>
        </div>
      )}
    </>
  );
};

export default BoardList;
