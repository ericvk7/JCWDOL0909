import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
  name: "order",
  initialState: {
    orderId: null,
  },
  reducers: {
    setOrderId: (state, action) => {
      state.orderId = action.payload;
    },
  },
});

export const { setOrderId } = transactionSlice.actions;
export default transactionSlice.reducer;
