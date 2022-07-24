import { createSlice } from "@reduxjs/toolkit";

const meetingSlice = createSlice({
  name: "meeting",
  initialState: {
    roomId: 0,
    headCount: 8,
    // 아래는 openvidu와 관련
    publisher: undefined,
    subscribers: [] as any[],
    currentVideoDevice: undefined,
  },
  reducers: {
    setPublisher(state, action) {
      state.publisher = action.payload;
    },
    pushSubscribers(state, action) {
      state.subscribers.push(action.payload);
    },
    removeSubscribers(state, action) {
      let index = state.subscribers.indexOf(action.payload, 0);
      if (index > -1) {
        state.subscribers.splice(index, 1);
      }
    },
    clearSubscribers(state) {
      state.subscribers = [];
    },
    setCurrentVideoDevice(state, action) {
      state.currentVideoDevice = action.payload;
    },
  },
});

export const {
  setPublisher,
  pushSubscribers,
  removeSubscribers,
  clearSubscribers,
  setCurrentVideoDevice,
} = meetingSlice.actions;

export default meetingSlice.reducer;
