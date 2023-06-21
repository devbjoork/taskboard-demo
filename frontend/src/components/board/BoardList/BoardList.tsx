import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useLazyGetThemesQuery } from '@/services/bff/boards.api';
import { Board } from '@/services/bff/types';
import { RootState } from '@/store/store';

import BoardItem from '../BoardItem/BoardItem';
import NewBoardModal from '../NewBoardModal/NewBoardModal';
import { BoardsHeading, ListContainer, NewBoardButton } from './BoardList.styled';

interface BoardListProps {
  boards: Board[];
  title: string;
  canCreate?: boolean;
}

const BoardList: React.FC<BoardListProps> = ({ boards, title, canCreate = false }) => {
  const [newModalVisible, setNewModalVisible] = useState(false);
  const [getThemes, { data: themes = [] }] = useLazyGetThemesQuery();

  const token = useSelector((state: RootState) => state.userCreds.accessToken);
  useEffect(() => {
    if (token) getThemes();
  }, [token, getThemes]);

  return (
    <>
      {(canCreate || boards.length > 0) && (
        <div>
          <BoardsHeading data-testid="title">{title}</BoardsHeading>
          <ListContainer>
            {boards.map((board: Board) => {
              return <BoardItem key={board._id} id={board._id} title={board.title} isStarred={board.starred} theme={board.themePrefs} />;
            })}

            {canCreate && (
              <NewBoardButton data-testid="btn-createBoard" onClick={() => setNewModalVisible(true)}>
                Create board
              </NewBoardButton>
            )}

            {newModalVisible && <NewBoardModal handleClose={() => setNewModalVisible(false)} themeList={themes} />}
          </ListContainer>
        </div>
      )}
    </>
  );
};

export default BoardList;
