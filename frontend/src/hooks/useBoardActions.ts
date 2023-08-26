import { useGetBoardByIdQuery } from '@/services/bff/boards.api';

export function useBoardActions(boardId: string) {
  const { currentData } = useGetBoardByIdQuery(boardId);
  if (currentData) return currentData.actions;
  else return [];
}
