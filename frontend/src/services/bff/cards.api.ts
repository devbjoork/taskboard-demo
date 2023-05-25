import { bffApi } from './bff.api';
import { boardsApi } from './boards.api';
import { Board, Column, Task } from './types';

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

    deleteCard: builder.mutation<Task, string>({
      query: (id) => ({
        url: `/task/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted({}, { dispatch, queryFulfilled }) {
        try {
          const { data: deletedCard } = await queryFulfilled;
          dispatch(
            boardsApi.util.updateQueryData(
              'getBoardById',
              deletedCard.board,
              (draft: Board) => {
                const targetColumn = draft.columns.find(
                  (column) => column._id === deletedCard.column
                );
                if (targetColumn) {
                  targetColumn.tasks = targetColumn.tasks.filter(
                    (task) => task._id !== deletedCard._id
                  );
                }
              }
            )
          );
        } catch {}
      },
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
      async onQueryStarted({}, { dispatch, queryFulfilled}) {
        try {
          const { data: modifiedCard } = await queryFulfilled;
          dispatch(
            boardsApi.util.updateQueryData(
              'getBoardById',
              modifiedCard.board,
              (draft: Board) => {
                const targetColumn = draft.columns.find((column) => column._id === modifiedCard.column);
                if (targetColumn) {
                  let targetCard = targetColumn.tasks.find((task) => task._id === modifiedCard._id);
                  if (targetCard) {
                    targetCard.title = modifiedCard.title;
                    targetCard.body = modifiedCard.body;
                  }
                }
              }
            )
          );
        } catch {}
      },
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
      async onQueryStarted({}, {dispatch, queryFulfilled}) {
        try {
          const { data: changedColumns } = await queryFulfilled;
          dispatch(
            boardsApi.util.updateQueryData(
              'getBoardById',
              changedColumns[0].board,
              (draft: Board) => {
                changedColumns.forEach((newColumn: Column) => {
                  const targetColumn = draft.columns.find((column) => column._id === newColumn._id);
                  if (targetColumn) {
                    targetColumn.tasks = newColumn.tasks;
                  }
                });
              }
            )
          );
        } catch {}
      },
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
