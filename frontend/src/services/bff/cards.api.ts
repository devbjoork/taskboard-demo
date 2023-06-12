import { bffApi } from './bff.api';
import { boardsApi } from './boards.api';
import { Board, CardState, ColumnState } from './types';

export const cardsApi = bffApi.injectEndpoints({
  endpoints: (builder) => ({
    createCard: builder.mutation<
      CardState,
      { title: string; columnId: string; boardId: string }
    >({
      query: (body) => ({
        url: '/card',
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
                  ?.cards.push(createdCard);
              }
            )
          );
        } catch {}
      },
    }),

    deleteCard: builder.mutation<CardState, string>({
      query: (id) => ({
        url: `/card/${id}`,
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
                  targetColumn.cards = targetColumn.cards.filter(
                    (card) => card._id !== deletedCard._id
                  );
                }
              }
            )
          );
        } catch {}
      },
    }),

    updateCard: builder.mutation<
      CardState,
      { body: { body: string; title: string }; cardId: string }
    >({
      query: (payload) => ({
        url: `/card/${payload.cardId}`,
        method: 'PATCH',
        body: payload.body,
      }),
      async onQueryStarted({}, { dispatch, queryFulfilled }) {
        try {
          const { data: modifiedCard } = await queryFulfilled;
          dispatch(
            boardsApi.util.updateQueryData(
              'getBoardById',
              modifiedCard.board,
              (draft: Board) => {
                const targetColumn = draft.columns.find(
                  (column) => column._id === modifiedCard.column
                );
                if (targetColumn) {
                  let targetCard = targetColumn.cards.find(
                    (card) => card._id === modifiedCard._id
                  );
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
      ColumnState[],
      {
        boardId: string;
        cardId: string;
        source: { columnId: string; index: number };
        target: { columnId: string; index: number };
      }
    >({
      query: (payload) => ({
        url: `/card/${payload.cardId}/move`,
        method: 'PATCH',
        body: { source: payload.source, target: payload.target },
      }),
      async onQueryStarted(
        { boardId, source, target },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          boardsApi.util.updateQueryData(
            'getBoardById',
            boardId,
            (draft: Board) => {
              const sourceColumn = draft.columns.find(
                (c) => c._id === source.columnId
              );
              const targetColumn = draft.columns.find(
                (c) => c._id === target.columnId
              );
              if (sourceColumn && targetColumn) {
                const [card] = sourceColumn.cards.splice(source.index, 1);
                card.column = targetColumn._id;
                targetColumn.cards.splice(target.index, 0, card);
              }
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

    addLabel: builder.mutation<
      CardState,
      {
        boardId: string;
        columnId: string;
        cardId: string;
        labelId: string;
      }
    >({
      query: (payload) => ({
        url: `/card/${payload.cardId}/label`,
        method: 'PUT',
        body: { labelId: payload.labelId },
      }),
      async onQueryStarted(
        { boardId, columnId, cardId, labelId },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          boardsApi.util.updateQueryData(
            'getBoardById',
            boardId,
            (draft: Board) => {
              const column = draft.columns.find((c) => c._id === columnId);
              if (column) {
                const card = column.cards.find((c) => c._id === cardId);
                if (card) {
                  card.labels.push(labelId);
                }
              }
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

    removeLabel: builder.mutation<
      CardState,
      {
        boardId: string;
        columnId: string;
        cardId: string;
        labelId: string;
      }
    >({
      query: (payload) => ({
        url: `/card/${payload.cardId}/label`,
        method: 'DELETE',
        body: { labelId: payload.labelId },
      }),
      async onQueryStarted(
        { boardId, columnId, cardId, labelId },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          boardsApi.util.updateQueryData(
            'getBoardById',
            boardId,
            (draft: Board) => {
              const column = draft.columns.find((c) => c._id === columnId);
              if (column) {
                const card = column.cards.find((c) => c._id === cardId);
                if (card) {
                  card.labels = card.labels.filter((l) => l !== labelId);
                }
              }
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
  useCreateCardMutation,
  useDeleteCardMutation,
  useUpdateCardMutation,
  useMoveCardMutation,
  useAddLabelMutation,
  useRemoveLabelMutation,
} = cardsApi;
