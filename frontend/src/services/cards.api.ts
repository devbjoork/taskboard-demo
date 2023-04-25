import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store/store';

export const cardsApi = createApi({
  reducerPath: 'cardsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/',
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const accessToken = state.userCreds.accessToken;
      headers.set('Authorization', `Bearer ${accessToken}`);
    },
  }),
  endpoints: (builder) => ({
    createCard: builder.mutation<any, { title: string; columnId: string }>({
      query: (body) => ({
        url: '/task',
        method: 'POST',
        body,
      }),
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
        cardId: string,
        source: { columnId: string; index: number };
        target: { columnId: string; index: number };
      }
    >({
      query: (payload) => ({
        url: `/task/${payload.cardId}/move`,
        method: 'PATCH',
        body: { source: payload.source, target: payload.target },
      }),
    }),
  }),
});

export const {
  useCreateCardMutation,
  useDeleteCardMutation,
  useUpdateCardMutation,
  useMoveCardMutation,
} = cardsApi;
