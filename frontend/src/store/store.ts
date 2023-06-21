import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { bffApi } from '../services/bff/bff.api';
import preferencesReducer from './preferencesSlice';
import userCredsReducer from './userCredsSlice';

export const store = configureStore({
  reducer: {
    userCreds: userCredsReducer,
    preferences: preferencesReducer,
    [bffApi.reducerPath]: bffApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([bffApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
