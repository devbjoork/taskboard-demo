import { createContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { BoardContainer } from './BoardPage.styled';
import BoardHeading from '../../components/board/BoardHeading/BoardHeading';
import ColumnList from '../../components/column/ColumnList/ColumnList';
import { RootState } from '../../store/store';
import { useLazyGetBoardByIdQuery } from '../../services/bff/boards.api';

export const BoardIdContext = createContext<string>('');

const BoardPage: React.FC = () => {
  const params: any = useParams();
  const [lazyGetBoard, { data }] = useLazyGetBoardByIdQuery();
  const token = useSelector((state: RootState) => state.userCreds.accessToken);

  useEffect(() => {
    if (token) lazyGetBoard(params.boardId);
  }, [token]);

  if (!data) return <BoardContainer>Loading</BoardContainer>;
  else
    return (
      <BoardIdContext.Provider value={params.boardId}>
        <BoardContainer>
          <BoardHeading title={data.title} userData={data.userData} />
          <ColumnList columns={data.columns} cards={data.cards} />
        </BoardContainer>
      </BoardIdContext.Provider>
    );
};

export default BoardPage;
