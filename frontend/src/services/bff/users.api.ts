import { bffApi } from './bff.api';
import { HTTPMethod } from './consts';
import { UserData } from './types';

const USER_PREFIX = '/user';

export const usersApi = bffApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserData: builder.query<UserData, void>({
      query: () => ({
        url: `${USER_PREFIX}`,
        method: HTTPMethod.GET,
      }),
    }),

    starBoard: builder.mutation<unknown, { boardId: string; action: string }>({
      query: (payload) => ({
        url: `${USER_PREFIX}/star`,
        method: HTTPMethod.PATCH,
        body: payload,
      }),
      invalidatesTags: ['Boards'],
    }),

    sendUserData: builder.mutation<unknown, unknown>({
      query: (payload) => ({
        url: `${USER_PREFIX}/signin`,
        method: HTTPMethod.POST,
        body: payload,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetUserDataQuery, useStarBoardMutation, useSendUserDataMutation } = usersApi;
