import { bffApi } from "./bff.api";
import { Board, Column } from "./types";

export const boardsApi = bffApi.injectEndpoints({
  endpoints: (builder) => ({
    getBoards: builder.query<Board[], void>({
      query: () => '/board',
    }),

    getBoardById: builder.query<Board, string>({
      query: (id) => ({ url: `/board/${id}` }),
      providesTags: ['Board'],
    }),

    createBoard: builder.mutation<any, void>({
      query: (body) => ({
        url: '/board',
        method: 'POST',
        body,
      }),
    }),

    updateBoard: builder.mutation<any, { id: string; title: string }>({
      query: (payload) => ({
        url: `/board/${payload.id}`,
        method: 'PATCH',
        body: { title: payload.title },
      }),
    }),

    reorderColumnsCall: builder.mutation<
      any,
      { id: string; newColumnOrder: string[] }
    >({
      query: (payload) => ({
        url: `/board/${payload.id}/reorder`,
        method: 'PATCH',
        body: payload.newColumnOrder,
      }),
      async onQueryStarted(
        { id, newColumnOrder },
        { dispatch, queryFulfilled }
      ) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            boardsApi.util.updateQueryData('getBoardById', id, (draft: Board) => {
              const newColumns: Column[] = [];
              newColumnOrder.forEach((columnId: string) => {
                const foundColumn = draft.columns.find(
                  (column) => column._id === columnId
                );
                if (foundColumn) newColumns.push(foundColumn);
              });
              draft.columns = newColumns;
            })
          );
        } catch {}
      },
    }),

    deleteBoard: builder.mutation<any, string>({
      query: (id) => ({
        url: `/board/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: false,
});

export const { 
  useGetBoardsQuery,
  useLazyGetBoardsQuery,
  useCreateBoardMutation,
  useGetBoardByIdQuery,
  useLazyGetBoardByIdQuery,
  useUpdateBoardMutation,
  useReorderColumnsCallMutation,
  useDeleteBoardMutation,
} = boardsApi;