import { configureStore } from "@reduxjs/toolkit";
import contactApi from "./contacts/api";
import { contactsSlice } from "./contacts/slice";

export const store = configureStore({
  reducer: {
    contacts: contactsSlice.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(contactApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
