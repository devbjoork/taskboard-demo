import { useGetBoardByIdQuery } from '@/services/bff/boards.api';

export function useBoardLabels(boardId: string) {
  const { currentData } = useGetBoardByIdQuery(boardId);
  if (currentData) return currentData.labels;
  else return [];
}
