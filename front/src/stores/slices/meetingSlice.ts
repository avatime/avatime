import { createSlice } from "@reduxjs/toolkit";

const meetingSlice = createSlice({
  name: "meeting",
  initialState: {
    roomId: undefined,
    userList: [] as any[],
  },
  reducers: {
    setMeetingRoomId(state, action) {
      state.roomId = action.payload;
    },
    addUserList(state, action) {
      state.userList.push(action.payload);
    },
    removeUserList(state, action) {
      let index = state.userList.findIndex((it) => it.user_id);
      if (-1 < index) {
        state.userList.splice(index, 1);
      }
    },
    clearUserList(state) {
      state.userList = [];
    },
  },
});

export const { setMeetingRoomId, addUserList, removeUserList, clearUserList } = meetingSlice.actions;

export default meetingSlice.reducer;
