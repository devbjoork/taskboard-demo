import { bffApi } from './bff.api';

export const usersApi = bffApi.injectEndpoints({
  endpoints: (builder) => ({
    starBoard: builder.mutation<unknown, { boardId: string; action: string }>({
      query: (payload) => ({
        url: '/user/star',
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['Boards'],
    }),

    sendUserData: builder.mutation<unknown, unknown>({
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
