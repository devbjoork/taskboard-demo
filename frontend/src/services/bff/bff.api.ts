import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { getAuth } from 'firebase/auth';

import { firebaseApp } from '@/auth/firebase';
import { RootState } from '@/store/store';

export const bffApi = createApi({
  reducerPath: 'bffApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/',
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
    },
  }),
  tagTypes: ['Board', 'Boards'],
  endpoints: () => ({}),
});
