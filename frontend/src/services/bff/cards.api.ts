import { bffApi } from './bff.api';
import { boardsApi } from './boards.api';
import { HTTPMethod } from './consts';
import { ActionState, Board, CardState, ColumnState } from './types';

const CARD_PREFIX = '/card';

export const cardsApi = bffApi.injectEndpoints({
  endpoints: (builder) => ({
    createCard: builder.mutation<
      CardState,
      { title: string; columnId: string; boardId: string }
    >({
      query: (body) => ({
        url: CARD_PREFIX,
        method: HTTPMethod.POST,
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
                  ?.cards.push(createdCard._id);
                draft.cards = [...draft.cards, createdCard];
              }
            )
          );
        } catch {}
      },
    }),

    deleteCard: builder.mutation<CardState, string>({
      query: (id) => ({
        url: `${CARD_PREFIX}/${id}`,
        method: HTTPMethod.DELETE,
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
                    (card) => card !== deletedCard._id
                  );
                }

                draft.cards = draft.cards.filter(
                  (card) => card._id !== deletedCard._id
                );
              }
            )
          );
        } catch {}
      },
    }),

    updateCard: builder.mutation<
      CardState,
      { body: { body?: string; title?: string }; cardId: string }
    >({
      query: (payload) => ({
        url: `${CARD_PREFIX}/${payload.cardId}`,
        method: HTTPMethod.PATCH,
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
                const targetCard = draft.cards.find(
                  (card) => card._id === modifiedCard._id
                );
                if (targetCard) {
                  targetCard.title = modifiedCard.title;
                  targetCard.body = modifiedCard.body;
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
        url: `${CARD_PREFIX}/${payload.cardId}/move`,
        method: HTTPMethod.PATCH,
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
                // card.column = targetColumn._id;
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
        cardId: string;
        labelId: string;
      }
    >({
      query: (payload) => ({
        url: `${CARD_PREFIX}/${payload.cardId}/label`,
        method: HTTPMethod.PUT,
        body: { labelId: payload.labelId },
      }),
      async onQueryStarted(
        { boardId, cardId, labelId },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          boardsApi.util.updateQueryData(
            'getBoardById',
            boardId,
            (draft: Board) => {
              const targetCard = draft.cards.find(
                (card) => card._id === cardId
              );
              if (targetCard) targetCard.labels.push(labelId);
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
        cardId: string;
        labelId: string;
      }
    >({
      query: (payload) => ({
        url: `${CARD_PREFIX}/${payload.cardId}/label`,
        method: HTTPMethod.DELETE,
        body: { labelId: payload.labelId },
      }),
      async onQueryStarted(
        { boardId, cardId, labelId },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          boardsApi.util.updateQueryData(
            'getBoardById',
            boardId,
            (draft: Board) => {
              const targetCard = draft.cards.find((c) => c._id === cardId);
              if (targetCard)
                targetCard.labels = targetCard.labels.filter(
                  (l) => l !== labelId
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

    addAssignee: builder.mutation<
      CardState,
      { boardId: string; cardId: string; assigneeId: string }
    >({
      query: (payload) => ({
        url: `${CARD_PREFIX}/${payload.cardId}/assignee`,
        method: HTTPMethod.PUT,
        body: { assigneeId: payload.assigneeId },
      }),
      async onQueryStarted(
        { boardId, cardId, assigneeId },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          boardsApi.util.updateQueryData(
            'getBoardById',
            boardId,
            (draft: Board) => {
              const targetCard = draft.cards.find((c) => c._id === cardId);
              if (targetCard) targetCard.assignee.push(assigneeId);
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

    removeAssignee: builder.mutation<
      CardState,
      { boardId: string; cardId: string; assigneeId: string }
    >({
      query: (payload) => ({
        url: `${CARD_PREFIX}/${payload.cardId}/assignee`,
        method: HTTPMethod.DELETE,
        body: { assigneeId: payload.assigneeId },
      }),
      async onQueryStarted(
        { boardId, cardId, assigneeId },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          boardsApi.util.updateQueryData(
            'getBoardById',
            boardId,
            (draft: Board) => {
              const targetCard = draft.cards.find((c) => c._id === cardId);
              if (targetCard)
                targetCard.assignee = targetCard.assignee.filter(
                  (a) => a !== assigneeId
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

    addComment: builder.mutation<
      ActionState,
      { boardId: string; cardId: string; commentBody: string }
    >({
      query: (payload) => ({
        url: `${CARD_PREFIX}/${payload.cardId}/comment`,
        method: HTTPMethod.PUT,
        body: { boardId: payload.boardId, commentBody: payload.commentBody },
      }),
      async onQueryStarted({ boardId, cardId }, { dispatch, queryFulfilled }) {
        try {
          const { data: createdComment } = await queryFulfilled;
          dispatch(
            boardsApi.util.updateQueryData(
              'getBoardById',
              boardId,
              (draft: Board) => {
                draft.actions.push(createdComment);
                const targetCard = draft.cards.find(
                  (card) => card._id === cardId
                );
                if (targetCard) targetCard.actions.push(createdComment._id);
              }
            )
          );
        } catch {}
      },
    }),

    deleteComment: builder.mutation<
      unknown,
      { boardId: string; cardId: string; commentId: string }
    >({
      query: (payload) => ({
        url: `${CARD_PREFIX}/${payload.cardId}/comment/${payload.commentId}`,
        method: HTTPMethod.DELETE,
      }),
      async onQueryStarted(
        { boardId, cardId, commentId },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          boardsApi.util.updateQueryData(
            'getBoardById',
            boardId,
            (draft: Board) => {
              draft.actions = draft.actions.filter((a) => a._id !== commentId);
              const targetCard = draft.cards.find((c) => c._id === cardId);
              if (targetCard)
                targetCard.actions = targetCard.actions.filter(
                  (a) => a !== commentId
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

    editComment: builder.mutation<
      ActionState,
      {
        boardId: string;
        cardId: string;
        commentId: string;
        commentBody: string;
      }
    >({
      query: (payload) => ({
        url: `${CARD_PREFIX}/${payload.cardId}/comment/${payload.commentId}`,
        method: HTTPMethod.PATCH,
        body: { commentBody: payload.commentBody },
      }),
      async onQueryStarted({ boardId }, { dispatch, queryFulfilled }) {
        try {
          const { data: modifiedComment } = await queryFulfilled;
          dispatch(
            boardsApi.util.updateQueryData(
              'getBoardById',
              boardId,
              (draft: Board) => {
                const targetAction = draft.actions.find(
                  (a) => a._id === modifiedComment._id
                );
                if (targetAction) {
                  targetAction.actionDateTime = modifiedComment.actionDateTime;
                  targetAction.payload.commentBody =
                    modifiedComment.payload.commentBody;
                  targetAction.payload.modified =
                    modifiedComment.payload.modified;
                }
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
  useAddLabelMutation,
  useRemoveLabelMutation,
  useAddAssigneeMutation,
  useRemoveAssigneeMutation,
  useAddCommentMutation,
  useDeleteCommentMutation,
  useEditCommentMutation,
} = cardsApi;
