import { bffApi } from './bff.api';
import { boardsApi } from './boards.api';
import { Board } from './types';

export const usersApi = bffApi.injectEndpoints({
  endpoints: (builder) => ({
    starBoard: builder.mutation<any, { boardId: string; action: string }>({
      query: (payload) => ({
        url: '/user/star',
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['Boards'],
      // async onQueryStarted(
      //   { boardId, action },
      //   { dispatch, queryFulfilled }
      // ) {
      //   try {
      //     const { data } = await queryFulfilled;
      //     dispatch(
      //       boardsApi.util.updateQueryData('getBoards', undefined, (draft: Board[]) => {
      //         draft.forEach((board) => {
      //           if (data.starredBoards.includes(board._id)) board.starred = true;
      //         });
      //       })
      //     );
      //   } catch {}
      // },
    }),

    sendUserData: builder.mutation<any, any>({
      query: (payload) => ({
        url: '/user/signin',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useStarBoardMutation, useSendUserDataMutation } = usersApi;
