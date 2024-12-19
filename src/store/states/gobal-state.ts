import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialStateTypes {
  FileId: string;
}

const initialState: initialStateTypes = {
  FileId: "",
};

export const accountState = createSlice({
  name: "app-state",
  initialState,
  reducers: {
    setFileID: (state, actions: PayloadAction<string>) => {
      state.FileId = actions.payload;
    },
  },
});

export const { setFileID } = accountState.actions;
