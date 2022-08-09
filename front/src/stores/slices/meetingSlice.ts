import { createSlice } from "@reduxjs/toolkit";

const meetingSlice = createSlice({
  name: "meeting",
  initialState: {
    roomId: undefined,
    subRoomId: undefined,
    userInfoList: [] as any[],
    pickUserName: undefined,
  },
  reducers: {
    setMeetingRoomId(state, action) {
      state.roomId = action.payload;
    },
    setSubMeetingRoomId(state, action) {
      state.subRoomId = action.payload;
    },
    setUserInfoList(state, action) {
      state.userInfoList = action.payload;
    },
    setPickUserName(state, action) {
      state.pickUserName = action.payload;
    },
  },
});

export const { setMeetingRoomId, setSubMeetingRoomId, setUserInfoList, setPickUserName } =
  meetingSlice.actions;

export default meetingSlice.reducer;
