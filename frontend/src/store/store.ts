import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import userCredsReducer from './userCredsSlice';
import { bffApi } from '../services/bff/bff.api';
import preferencesSlice from './preferencesSlice';

export const store = configureStore({
  reducer: {
    userCreds: userCredsReducer,
    preferences: preferencesSlice,
    [bffApi.reducerPath]: bffApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([bffApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
