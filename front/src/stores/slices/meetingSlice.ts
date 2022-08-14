import { createSlice } from "@reduxjs/toolkit";
import { MeetingUserInfoRes } from '../../apis/response/sessionRes';

export interface MeetingState {
  roomId: number | undefined;
  subRoomId: number | undefined;
  userInfoList: MeetingUserInfoRes[];
  pickUserName: string | undefined;
  balanceId: number | undefined;
  balanceA: string | undefined;
  balanceB: string | undefined;
}

const initialState: MeetingState = {
  roomId: undefined,
  subRoomId: undefined,
  userInfoList: [] as any[],
  pickUserName: undefined,
  balanceId: 1,
  balanceA: "부먹",
  balanceB: "찍먹",
};

const meetingSlice = createSlice({
  name: "meeting",
  initialState: initialState,
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
    setBalanceId(state, action) {
      state.balanceId = action.payload;
    },
    setBalanceA(state, action) {
      state.balanceA = action.payload;
    },
    setBalanceB(state, action) {
      state.balanceB = action.payload;
    },
    resetMeeting(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setMeetingRoomId,
  setSubMeetingRoomId,
  setUserInfoList,
  setPickUserName,
  resetMeeting,
  setBalanceId,
  setBalanceA,
  setBalanceB,
} = meetingSlice.actions;

export default meetingSlice.reducer;
