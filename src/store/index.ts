import { configureStore } from "@reduxjs/toolkit";
import orderSlice from "./orderSlice";
import appSlice from "./appSlice";

const store = configureStore({ reducer: { order: orderSlice, app: appSlice } });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
