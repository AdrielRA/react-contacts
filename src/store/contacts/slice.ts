import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";

export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    create: (state) => {
      state.push({
        id: state.length + 1,
        name: "Contact",
        category: "none",
      });
    },
    remove: (state) => {
      state.pop();
    },
    add: (state, { payload }: PayloadAction<IContact>) => state.push(payload),
  },
});
