import { bffApi } from './bff.api';
import { boardsApi } from './boards.api';
import { Board } from './types';

export const labelsApi = bffApi.injectEndpoints({
  endpoints: (builder) => ({
    createLabel: builder.mutation<any, { boardId: string }>({
      query: (payload) => ({
        url: `/label/${payload.boardId}`,
        method: 'POST',
      }),
      async onQueryStarted({ boardId }, { dispatch, queryFulfilled }) {
        try {
          const { data: createdLabel } = await queryFulfilled;
          dispatch(
            boardsApi.util.updateQueryData(
              'getBoardById',
              boardId,
              (draft: Board) => {
                draft.labels.push(createdLabel);
              }
            )
          );
        } catch {}
      },
    }),

    editLabel: builder.mutation<
      any,
      {
        boardId: string;
        labelId: string;
        title: string;
        color: string;
        textColor: string;
        name: string;
      }
    >({
      query: (payload) => ({
        url: `/label/${payload.labelId}`,
        method: 'PATCH',
        body: {
          title: payload.title,
          color: payload.color,
          textColor: payload.textColor,
          name: payload.name,
        },
      }),
      async onQueryStarted(
        { boardId, labelId, title, color, textColor, name },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          boardsApi.util.updateQueryData(
            'getBoardById',
            boardId,
            (draft: Board) => {
              const targetLabel = draft.labels.find((l) => l._id === labelId);
              if (targetLabel) {
                targetLabel.title = title;
                targetLabel.color = color;
                targetLabel.textColor = textColor;
                targetLabel.name = name;
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

    deleteLabel: builder.mutation<any, { boardId: string; labelId: string }>({
      query: (payload) => ({
        url: `/label/${payload.labelId}`,
        method: 'DELETE',
      }),
      async onQueryStarted({ boardId, labelId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          boardsApi.util.updateQueryData(
            'getBoardById',
            boardId,
            (draft: Board) => {
              draft.labels = draft.labels.filter(
                (label) => label._id !== labelId
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
  useCreateLabelMutation,
  useEditLabelMutation,
  useDeleteLabelMutation,
} = labelsApi;
