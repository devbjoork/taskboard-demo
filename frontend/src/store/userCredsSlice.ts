import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface UserCredsState {
  accessToken: string;
  refreshToken: string;
  uid: string;
  photoURL: string;
}

const initialState: UserCredsState = {
  accessToken: '',
  refreshToken: '',
  uid: '',
  photoURL: '',
};

export const userCredsSlice = createSlice({
  name: 'userCreds',
  initialState,
  reducers: {
    setUserCreds: (state, action: PayloadAction<UserCredsState>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.uid = action.payload.uid;
      state.photoURL = action.payload.photoURL;
    },
    resetUserCreds: (state) => {
      state.accessToken = '';
      state.refreshToken = '';
      state.uid = '';
      state.photoURL = '';
    },
  },
});

export const { setUserCreds, resetUserCreds } = userCredsSlice.actions;
export default userCredsSlice.reducer;
