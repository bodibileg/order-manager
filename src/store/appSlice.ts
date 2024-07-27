import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  title: string;
  isDarkMode: boolean;
}

const initialState: AppState = {
  title: "Home",
  isDarkMode: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    }
  },
});

export const { setTitle, toggleDarkMode } = appSlice.actions;

export default appSlice.reducer;
