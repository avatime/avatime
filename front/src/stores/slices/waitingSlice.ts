import { createSlice } from "@reduxjs/toolkit";

const waitingSlice = createSlice({
  name: "waiting",
  initialState: {
    waitingUserList: null,
  },
  reducers: {
    setWaitingUserList(state, action) {
      state.waitingUserList = action.payload;
    },
  },
});

export const { setWaitingUserList } = waitingSlice.actions;

export default waitingSlice.reducer;
