import { bffApi } from './bff.api';
import { boardsApi } from './boards.api';
import { HTTPMethod } from './consts';
import { Board, ColumnState } from './types';

const COLUMN_PREFIX = '/column';

export const columnsApi = bffApi.injectEndpoints({
  endpoints: (builder) => ({
    createColumn: builder.mutation<
      ColumnState,
      { title: string; boardId: string }
    >({
      query: (body) => ({
        url: COLUMN_PREFIX,
        method: HTTPMethod.POST,
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
        url: `${COLUMN_PREFIX}/${id}`,
        method: HTTPMethod.DELETE,
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

    changeColumnTitle: builder.mutation<
      ColumnState,
      { id: string; title: string }
    >({
      query: (payload) => ({
        url: `${COLUMN_PREFIX}/${payload.id}`,
        method: HTTPMethod.PATCH,
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
