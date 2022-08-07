import { createSlice } from "@reduxjs/toolkit";

const meetingSlice = createSlice({
  name: "meeting",
  initialState: {
    roomId: undefined,
    userInfoList: [] as any[],
  },
  reducers: {
    setMeetingRoomId(state, action) {
      state.roomId = action.payload;
    },
    setUserInfoList(state, action) {
      state.userInfoList = action.payload;
    },
  },
});

export const { setMeetingRoomId, setUserInfoList } = meetingSlice.actions;

export default meetingSlice.reducer;
