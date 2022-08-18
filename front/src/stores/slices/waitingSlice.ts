import { createSlice } from "@reduxjs/toolkit";

export interface WaitingState {
  roomId: number | undefined;
  roomName: string | undefined;
  age: string | undefined;
  sido: string | undefined;
  isMaster: boolean | undefined;
  headCount: number | undefined;
  chatRoomId: number | undefined;
}

const initialState: WaitingState = {
  roomId: undefined,
  roomName: undefined,
  age: undefined,
  sido: undefined,
  isMaster: undefined,
  headCount: undefined,
  chatRoomId: undefined,
};

const waitingSlice = createSlice({
  name: "waiting",
  initialState,
  reducers: {
    setWaitingRoomId(state, action) {
      state.roomId = action.payload;
    },
    setRoomName(state, action) {
      state.roomName = action.payload;
    },
    setAge(state, action) {
      state.age = action.payload;
    },
    setSido(state, action) {
      state.sido = action.payload;
    },
    setMaster(state, action) {
      state.isMaster = action.payload;
    },
    setHeadCount(state, action) {
      state.headCount = action.payload;
    },
    setChatRoomId(state, action) {
      state.chatRoomId = action.payload;
    },
    resetWaiting(state) {
      Object.assign(state, initialState)
    },
  },
});

export const {
  setWaitingRoomId,
  setRoomName,
  setAge,
  setSido,
  setMaster,
  setHeadCount,
  setChatRoomId,
  resetWaiting,
} = waitingSlice.actions;

export default waitingSlice.reducer;
