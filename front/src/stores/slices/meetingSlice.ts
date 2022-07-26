import { createSlice } from "@reduxjs/toolkit";

const meetingSlice = createSlice({
  name: "meeting",
  initialState: {
    roomId: 0,
    userList: undefined,
    blurStatus: false,
  },
  reducers: {
    setUserList(state, action) {
      state.userList = action.payload;
    },
    changeBlurStatus(state) {
      state.blurStatus = !state.blurStatus;
    }
  },
});

export const { setUserList, changeBlurStatus } = meetingSlice.actions;

export default meetingSlice.reducer;
