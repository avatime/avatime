import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBgmSrc } from "../stores/slices/bgmSlice";
import bgmMain from "../assets/audio/bgm_main.mp3";
import bgmMeeting from "../assets/audio/bgm_meeting.mp3";
import bgmSelect from "../assets/audio/bgm_select.mp3";

type BgmType = "main" | "select" | "meeting";

export const useBGM = (bgmType: BgmType) => {
  const dispatch = useDispatch();
  useEffect(() => {
    let bgm;
    switch (bgmType) {
      case "main":
        bgm = bgmMain;
        break;
      case "select":
        bgm = bgmSelect;
        break;
      case "meeting":
        bgm = bgmMeeting;
        break;
    }
    dispatch(setBgmSrc(bgm));
    return () => {
      dispatch(setBgmSrc(bgmMain));
    };
  }, [bgmType, dispatch]);
};
