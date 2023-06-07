import { bffApi } from './bff.api';
import { Board, ColumnState } from './types';

export const boardsApi = bffApi.injectEndpoints({
  endpoints: (builder) => ({
    getBoards: builder.query<Board[], void>({
      query: () => '/board',
      providesTags: ['Boards'],
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
        const patchResult = dispatch(
          boardsApi.util.updateQueryData('getBoardById', id, (draft: Board) => {
            const newColumns: ColumnState[] = [];
            newColumnOrder.forEach((columnId: string) => {
              const foundColumn = draft.columns.find(
                (column) => column._id === columnId
              );
              if (foundColumn) newColumns.push(foundColumn);
            });
            draft.columns = newColumns;
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    deleteBoard: builder.mutation<any, string>({
      query: (id) => ({
        url: `/board/${id}`,
        method: 'DELETE',
      }),
    }),

    shareBoard: builder.mutation<any, { id: string; emailList: string[] }>({
      query: (payload) => ({
        url: `/board/${payload.id}/share`,
        method: 'POST',
        body: { emailList: payload.emailList },
      }),
      async onQueryStarted(
        { id, emailList },
        { dispatch, queryFulfilled }
      ) {
        try {
          const { data: addedUsers } = await queryFulfilled;
          dispatch(
            boardsApi.util.updateQueryData(
              'getBoardById', id, (draft: Board) => {
                for (const user of addedUsers) {
                  draft.users.push(user.uid);
                  draft.userData.push(user);
                }
              }
            )
          )
        } catch {}
      },
    }),

    removeUserFromBoard: builder.mutation<
      any,
      { boardId: string; userUID: string }
    >({
      query: (payload) => ({
        url: `/board/${payload.boardId}/user/${payload.userUID}`,
        method: 'DELETE',
      }),
      async onQueryStarted(
        { boardId, userUID },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          boardsApi.util.updateQueryData('getBoardById', boardId, (draft: Board) => {
            draft.users = draft.users.filter((user) => user !== userUID);
            draft.userData = draft.userData.filter((userData) => userData.uid !== userUID);
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
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
  useShareBoardMutation,
  useRemoveUserFromBoardMutation,
} = boardsApi;
