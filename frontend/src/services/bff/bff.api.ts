import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { RootState } from '../../store/store';

export const bffApi = createApi({
  reducerPath: 'bffApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/',
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const accessToken = state.userCreds.accessToken;
      headers.set('Authorization', `Bearer ${accessToken}`);
    },
  }),
  tagTypes: ['Board', 'Boards'],
  endpoints: () => ({}),
});
