import { RootState } from "..";

export const selectCount = (state: RootState) => state.contacts.length;
