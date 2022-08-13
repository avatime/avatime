import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBgmSrc } from "../stores/slices/bgmSlice";

type BgmType = "main" | "select" | "meeting";

export const useBGM = (bgmType: BgmType) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setBgmSrc(`bgm_${bgmType}.mp3`));
    return () => {
      dispatch(setBgmSrc("bgm_main.mp3"));
    };
  }, [bgmType, dispatch]);
};
