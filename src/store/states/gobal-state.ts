import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialStateTypes {
  isSheetEditiorOpen: boolean;
}

const initialState: initialStateTypes = {
  isSheetEditiorOpen: false,
};

export const accountState = createSlice({
  name: "app-state",
  initialState,
  reducers: {
    setIsSheetEditiorOpen: (state) => {
      state.isSheetEditiorOpen = !state.isSheetEditiorOpen;
    },
  },
});

export const { setIsSheetEditiorOpen } = accountState.actions;
