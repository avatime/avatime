import { createSlice } from "@reduxjs/toolkit";

interface MeetingState {
  roomId: number | undefined;
  totalChatRoomId: number | undefined;
  genderChatRoomId: number | undefined;
  userList: undefined;
}

const initialState: MeetingState = {
  roomId: undefined,
  totalChatRoomId: undefined,
  genderChatRoomId: undefined,
  userList: undefined,
};

const meetingSlice = createSlice({
  name: "meeting",
  initialState,
  reducers: {
    setMeetingRoomId(state, action) {
      state.roomId = action.payload;
    },
    setTotalChatRoomId(state, action) {
      state.totalChatRoomId = action.payload;
    },
    setGenderChatRoomId(state, action) {
      state.genderChatRoomId = action.payload;
    },
    setUserList(state, action) {
      state.userList = action.payload;
    },
  },
});

export const { setUserList, setMeetingRoomId } = meetingSlice.actions;

export default meetingSlice.reducer;
