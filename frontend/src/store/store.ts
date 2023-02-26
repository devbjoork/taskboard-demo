import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { boardsApi } from '../services/boards.api';
import userCredsReducer from './userCredsSlice';
import boardsReducer from './boardsSlice';
import { columnsApi } from '../services/columns.api';
import { cardsApi } from '../services/cards.api';

export const store = configureStore({
  reducer: {
    userCreds: userCredsReducer,
    boards: boardsReducer,
    [boardsApi.reducerPath]: boardsApi.reducer,
    [columnsApi.reducerPath]: columnsApi.reducer,
    [cardsApi.reducerPath]: cardsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      boardsApi.middleware,
      columnsApi.middleware,
      cardsApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
