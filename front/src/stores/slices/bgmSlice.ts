import { createSlice } from "@reduxjs/toolkit";
import bgmMain from "../../assets/audio/bgm_main.mp3";

const bgmSlice = createSlice({
  name: "bgm",
  initialState: {
    playing: false,
    volume: 50,
    src: bgmMain,
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
