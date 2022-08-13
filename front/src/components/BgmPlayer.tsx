import { Box } from "@mui/material";
import React, { FC, useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

interface IProps {
  children: JSX.Element;
}

export const BgmPlayer: FC<IProps> = ({ children }) => {
  const ref = useRef<any>();
  const playing = useSelector((state: any) => state.bgm.playing);
  useEffect(() => {
    if (playing) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }, [playing]);

  const volume = useSelector((state: any) => state.bgm.volume);
  useEffect(() => {
    console.log(volume);
    if (!volume) {
      return;
    }
    console.log(volume / 100);
    ref.current.volume = volume / 100;
  }, [volume]);

  const [bgm, setBgm] = useState("bgm_main.mp3");
  
  return (
    <Box>
      {children}
      <audio
        ref={ref}
        preload="auto"
        loop
        style={{
          position: "absolute",
          top: 0,
        }}
      >
        <source src={`${process.env.PUBLIC_URL}/${bgm}`} type="audio/mpeg" />
      </audio>
    </Box>
  );
};
