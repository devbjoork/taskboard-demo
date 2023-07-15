import { createContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';

import BoardHeading from '@/components/board/BoardHeading/BoardHeading';
import ColumnList from '@/components/column/ColumnList/ColumnList';
import Header from '@/components/Header/Header';
import { useLazyGetBoardByIdQuery } from '@/services/bff/boards.api';
import { RootState } from '@/store/store';

import { BoardContainer } from './BoardPage.styled';

export const BoardIdContext = createContext<string>('');

const BoardPage: React.FC = () => {
  const params = useParams();
  const [lazyGetBoard, { data }] = useLazyGetBoardByIdQuery();
  const token = useSelector((state: RootState) => state.userCreds.accessToken);

  const boardId = params.boardId || '';

  useEffect(() => {
    if (token) lazyGetBoard(boardId);
  }, [token, lazyGetBoard, boardId]);

  if (!data) return <BoardContainer>Loading</BoardContainer>;
  else
    return (
      <BoardIdContext.Provider value={boardId}>
        <Header theme={data.themePrefs} />
        <BoardContainer theme={data.themePrefs}>
          <BoardHeading title={data.title} userData={data.userData} />
          <ColumnList columns={data.columns} />
        </BoardContainer>
        <Outlet />
      </BoardIdContext.Provider>
    );
};

export default BoardPage;
