import { createSlice } from "@reduxjs/toolkit";

const meetingSlice = createSlice({
  name: "meeting",
  initialState: {
    roomId: 0,
    userList: undefined,
  },
  reducers: {
    setUserList(state, action) {
      state.userList = action.payload;
    },
  },
});

export const { setUserList } = meetingSlice.actions;

export default meetingSlice.reducer;
