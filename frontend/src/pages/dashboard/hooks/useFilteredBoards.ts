import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLazyGetBoardsQuery } from '@/services/bff/boards.api';
import { RootState } from '@/store/store';

export const useFilteredBoards = () => {
  const token = useSelector((state: RootState) => state.userCreds.accessToken);
  const uid = useSelector((state: RootState) => state.userCreds.uid);
  const [lazyGetBoards, { data = [] }] = useLazyGetBoardsQuery();

  useEffect(() => {
    if (token) lazyGetBoards();
  }, [token]);

  const ownedBoards = data.filter((board) => {
    return board.ownerId === uid;
  });

  const sharedBoards = data.filter((board) => {
    return board.ownerId !== uid;
  });

  const starredBoards = data.filter((board) => {
    return board.starred === true;
  });

  return {
    ownedBoards,
    sharedBoards,
    starredBoards,
  };
};
