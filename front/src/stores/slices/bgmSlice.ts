import { createSlice } from "@reduxjs/toolkit";

const bgmSlice = createSlice({
  name: "bgm",
  initialState: {
    playing: false,
    volume: 50,
  },
  reducers: {
    setPlaying(state, action) {
      state.playing = action.payload;
    },
    setVolume(state, action) {
      state.volume = action.payload;
    },
  },
});

export const { setPlaying, setVolume } = bgmSlice.actions;

export default bgmSlice.reducer;
