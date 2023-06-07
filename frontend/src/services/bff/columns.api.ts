import { bffApi } from './bff.api';
import { boardsApi } from './boards.api';
import { Board, ColumnState } from './types';

export const columnsApi = bffApi.injectEndpoints({
  endpoints: (builder) => ({
    createColumn: builder.mutation<any, { title: string; boardId: string }>({
      query: (body) => ({
        url: '/column',
        method: 'POST',
        body,
      }),
      async onQueryStarted({ boardId }, { dispatch, queryFulfilled }) {
        try {
          const { data: newColumn } = await queryFulfilled;
          dispatch(
            boardsApi.util.updateQueryData(
              'getBoardById',
              boardId,
              (draft: Board) => {
                draft.columns.push(newColumn);
              }
            )
          );
        } catch {}
      },
    }),

    deleteColumn: builder.mutation<ColumnState, string>({
      query: (id) => ({
        url: `/column/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(columnId, { dispatch, queryFulfilled }) {
        try {
          const { data: deletedColumn } = await queryFulfilled;
          dispatch(
            boardsApi.util.updateQueryData(
              'getBoardById',
              deletedColumn.board,
              (draft: Board) => {
                draft.columns = draft.columns.filter(
                  (c) => c._id !== deletedColumn._id
                );
              }
            )
          );
        } catch {}
      },
    }),

    changeColumnTitle: builder.mutation<any, { id: string; title: string }>({
      query: (payload) => ({
        url: `/column/${payload.id}`,
        method: 'PATCH',
        body: { title: payload.title },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateColumnMutation,
  useDeleteColumnMutation,
  useChangeColumnTitleMutation,
} = columnsApi;
