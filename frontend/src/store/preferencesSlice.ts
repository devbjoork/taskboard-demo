import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PreferencesState {
  labelsExpanded: boolean;
}

const initialState: PreferencesState = {
  labelsExpanded: false,
};

export const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setLabelsExpanded: (state, action: PayloadAction<boolean>) => {
      state.labelsExpanded = action.payload;
    },
  },
});

export const { setLabelsExpanded } = preferencesSlice.actions;
export default preferencesSlice.reducer;
