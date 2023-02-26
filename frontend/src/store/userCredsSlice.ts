import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserCredsState {
  accessToken: string;
  photoURL: string;
}

const initialState: UserCredsState = {
  accessToken: '',
  photoURL: '',
};

export const userCredsSlice = createSlice({
  name: 'userCreds',
  initialState,
  reducers: {
    setUserCreds: (state, action: PayloadAction<UserCredsState>) => {
      state.accessToken = action.payload.accessToken;
      state.photoURL = action.payload.photoURL;
    },
    resetUserCreds: (state) => {
      state.accessToken = '';
      state.photoURL = '';
    },
  },
});

export const { setUserCreds, resetUserCreds } = userCredsSlice.actions;
export default userCredsSlice.reducer;
