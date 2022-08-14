import { createSlice } from "@reduxjs/toolkit";

const bgmSlice = createSlice({
  name: "bgm",
  initialState: {
    playing: false,
    volume: 50,
    src: `bgm_main.mp3`,
    number: 0
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
    },
    addnumber(state) {
      state.number = state.number + 1;
    }
  },
});

export const { setBgmPlaying, setBgmVolume, setBgmSrc, addnumber } = bgmSlice.actions;

export default bgmSlice.reducer;
