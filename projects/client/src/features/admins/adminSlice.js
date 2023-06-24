import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
  name: "admins",
  initialState: {
    user: {
      id: "",
      name: "",
      email: "",
      username: "",
    },
  },
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id_product === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push({ ...action.payload });
      }
      state.total += action.payload.price * action.payload.quantity;
    },

    removeItem: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      const item = state.items[index];
      console.log(action.payload);
      // state.total -= item.p * item.quantity;
      state.items.splice(index, 1);
    },
  },
});

export const { addItem, removeItem } = adminSlice.actions;

export default adminSlice.reducer;
