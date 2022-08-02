import { createSlice } from "@reduxjs/toolkit";

export interface WaitingState {
  roomId: number;
  roomName: string;
  age: string;
  region: string;
  isMaster: boolean;
  headCount: number;
}

const initialState: WaitingState = {
  roomId: 1,
  roomName: "파이썬 보초만",
  age: "20대",
  region: "경기도",
  isMaster: true,
  headCount: 8,
};

const waitingSlice = createSlice({
  name: "waiting",
  initialState,
  reducers: {
    setRoomId(state, action) {
      state.roomId = action.payload;
    },
    setRoomName(state, action) {
      state.roomName = action.payload;
    },
    setAge(state, action) {
      state.age = action.payload;
    },
    setRegion(state, action) {
      state.region = action.payload;
    },
  },
});

export const { setRoomId, setRoomName, setAge, setRegion } = waitingSlice.actions;

export default waitingSlice.reducer;
