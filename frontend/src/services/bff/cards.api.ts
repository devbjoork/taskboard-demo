import { bffApi } from "./bff.api";
import { boardsApi } from "./boards.api";
import { Board } from "./types";

export const cardsApi = bffApi.injectEndpoints({
  endpoints: (builder) => ({
    createCard: builder.mutation<
      any,
      { title: string; columnId: string; boardId: string }
    >({
      query: (body) => ({
        url: '/task',
        method: 'POST',
        body,
      }),
      async onQueryStarted(
        { boardId, columnId },
        { dispatch, queryFulfilled }
      ) {
        try {
          const { data: createdCard } = await queryFulfilled;
          dispatch(
            boardsApi.util.updateQueryData(
              'getBoardById',
              boardId,
              (draft: Board) => {
                draft.columns
                  .find((column) => column._id === columnId)
                  ?.tasks.push(createdCard);
              }
            )
          );
        } catch {}
      },
    }),

    deleteCard: builder.mutation<any, string>({
      query: (id) => ({
        url: `/task/${id}`,
        method: 'DELETE',
      }),
    }),

    updateCard: builder.mutation<
      any,
      { body: { body: string; title: string }; cardId: string }
    >({
      query: (payload) => ({
        url: `/task/${payload.cardId}`,
        method: 'PATCH',
        body: payload.body,
      }),
    }),

    moveCard: builder.mutation<
      any,
      {
        cardId: string;
        source: { columnId: string; index: number };
        target: { columnId: string; index: number };
      }
    >({
      query: (payload) => ({
        url: `/task/${payload.cardId}/move`,
        method: 'PATCH',
        body: { source: payload.source, target: payload.target },
      }),
      // invalidatesTags: ['Board'],
      // async onQueryStarted({}, {dispatch, queryFulfilled}) {
      //   try {
      //     const { data: changedColumns } = await queryFulfilled;
      //     dispatch(
      //       bffApi.util.updateQueryData(
      //         'getBoardById',
      //         changedColumns[0].board,
      //         (draft: Board) => {
      //           const oldColumns = draft.columns.slice();
      //           changedColumns.forEach((newColumn: Column) => {
      //             const index = oldColumns.findIndex((col) => { return col._id === newColumn._id});
      //             console.log(index);
      //             draft.columns[index] = newColumn;
      //           });
      //         }
      //       )
      //     );
      //   } catch {}
      // },
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateCardMutation,
  useDeleteCardMutation,
  useUpdateCardMutation,
  useMoveCardMutation,
} = cardsApi;