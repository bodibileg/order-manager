import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  title: string;
}

const initialState: AppState = {
  title: "Home",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
  },
});

export const { setTitle } = appSlice.actions;

export default appSlice.reducer;
