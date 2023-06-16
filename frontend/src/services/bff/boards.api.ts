import { bffApi } from './bff.api';
import { HTTPMethod } from './consts';
import { Board, ColumnState, UserData } from './types';

const BOARD_PREFIX = '/board';

export const boardsApi = bffApi.injectEndpoints({
  endpoints: (builder) => ({
    getBoards: builder.query<Board[], void>({
      query: () => BOARD_PREFIX,
      providesTags: ['Boards'],
    }),

    getThemes: builder.query<any[], void>({
      query: () => `/theme`,
    }),

    getBoardById: builder.query<Board, string>({
      query: (id) => ({ url: `${BOARD_PREFIX}/${id}` }),
      providesTags: ['Board'],
    }),

    createBoard: builder.mutation<
      Board,
      { title: string; visibility: string; themeId: string }
    >({
      query: (body) => ({
        url: BOARD_PREFIX,
        method: HTTPMethod.POST,
        body,
      }),
    }),

    updateBoard: builder.mutation<Board, { id: string; title: string }>({
      query: (payload) => ({
        url: `${BOARD_PREFIX}/${payload.id}`,
        method: HTTPMethod.PATCH,
        body: { title: payload.title },
      }),
    }),

    reorderColumnsCall: builder.mutation<
      string[],
      { id: string; newColumnOrder: string[] }
    >({
      query: (payload) => ({
        url: `${BOARD_PREFIX}/${payload.id}/reorder`,
        method: HTTPMethod.PATCH,
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

    deleteBoard: builder.mutation<Board, string>({
      query: (id) => ({
        url: `${BOARD_PREFIX}/${id}`,
        method: HTTPMethod.DELETE,
      }),
    }),

    shareBoard: builder.mutation<
      UserData[],
      { id: string; emailList: string[] }
    >({
      query: (payload) => ({
        url: `${BOARD_PREFIX}/${payload.id}/share`,
        method: HTTPMethod.POST,
        body: { emailList: payload.emailList },
      }),
      async onQueryStarted({ id, emailList }, { dispatch, queryFulfilled }) {
        try {
          const { data: addedUsers } = await queryFulfilled;
          dispatch(
            boardsApi.util.updateQueryData(
              'getBoardById',
              id,
              (draft: Board) => {
                for (const user of addedUsers) {
                  draft.users.push(user.uid);
                  draft.userData.push(user);
                }
              }
            )
          );
        } catch {}
      },
    }),

    // TODO: response type to UserData
    removeUserFromBoard: builder.mutation<
      any,
      { boardId: string; userUID: string }
    >({
      query: (payload) => ({
        url: `${BOARD_PREFIX}/${payload.boardId}/user/${payload.userUID}`,
        method: HTTPMethod.DELETE,
      }),
      async onQueryStarted({ boardId, userUID }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          boardsApi.util.updateQueryData(
            'getBoardById',
            boardId,
            (draft: Board) => {
              draft.users = draft.users.filter((user) => user !== userUID);
              draft.userData = draft.userData.filter(
                (userData) => userData.uid !== userUID
              );
            }
          )
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
  useLazyGetThemesQuery,
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
