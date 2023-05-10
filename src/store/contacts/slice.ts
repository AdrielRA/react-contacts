import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";

export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});
