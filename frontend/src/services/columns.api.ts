import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store/store';

export const columnsApi = createApi({
  reducerPath: 'columnsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/',
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const accessToken = state.userCreds.accessToken;
      headers.set('Authorization', `Bearer ${accessToken}`);
    },
  }),
  endpoints: (builder) => ({
    createColumn: builder.mutation<any, { title: string; boardId: string }>({
      query: (body) => ({
        url: '/column',
        method: 'POST',
        body,
      }),
    }),
    deleteColumn: builder.mutation<any, string>({
      query: (id) => ({
        url: `/column/${id}`,
        method: 'DELETE',
      }),
    }),
    changeColumnTitle: builder.mutation<any, { id: string; title: string }>({
      query: (payload) => ({
        url: `/column/${payload.id}`,
        method: 'PATCH',
        body: { title: payload.title },
      }),
    }),
  }),
});

export const {
  useCreateColumnMutation,
  useDeleteColumnMutation,
  useChangeColumnTitleMutation,
} = columnsApi;
