import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store/store';

export const boardsApi = createApi({
  reducerPath: 'boardsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/',
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const accessToken = state.userCreds.accessToken;
      headers.set('Authorization', `Bearer ${accessToken}`);
    },
  }),
  endpoints: (builder) => ({
    getBoards: builder.query<any, void>({
      query: () => '/board',
    }),
    getBoardById: builder.query<any, void>({
      query: (id) => ({ url: `/board/${id}` }),
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
    deleteBoard: builder.mutation<any, string>({
      query: (id) => ({
        url: `/board/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetBoardsQuery,
  useLazyGetBoardsQuery,
  useCreateBoardMutation,
  useGetBoardByIdQuery,
  useUpdateBoardMutation,
  useDeleteBoardMutation,
} = boardsApi;
