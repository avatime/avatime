import { createSlice } from "@reduxjs/toolkit";

const bgmSlice = createSlice({
  name: "bgm",
  initialState: {
    playing: true,
    volume: 50,
    src: `bgm_main.mp3`
  },
  reducers: {
    setBgmPlaying(state, action) {
      state.playing = action.payload;
    },
    setBgmVolume(state, action) {
      state.volume = action.payload;
    },
    setBgmSrc(state, action) {
      state.src = action.payload;
    }
  },
});

export const { setBgmPlaying, setBgmVolume, setBgmSrc } = bgmSlice.actions;

export default bgmSlice.reducer;
