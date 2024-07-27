import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order } from "../types";

export interface OrderState {
  draftOrder: Order | null;
}

const initialState: OrderState = {
  draftOrder: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setDraftOrder(state, action: PayloadAction<Order | null>) {
      state.draftOrder = action.payload;
    }
  },
});

export const { setDraftOrder } = orderSlice.actions;

export default orderSlice.reducer;
