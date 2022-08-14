import { Box } from "@mui/material";
import React, { FC, useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

interface IProps {
  children: JSX.Element;
}

export const BgmPlayer: FC<IProps> = ({ children }) => {
  const ref = useRef<any>();
  const number = useSelector((state: any) => state.bgm.number);
  const playing = useSelector((state: any) => state.bgm.playing);
  const volume = useSelector((state: any) => state.bgm.volume);
  useEffect(() => {
    if (playing) {
      ref.current.volume = volume / 100;
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }, [playing, number, volume]);

  useEffect(() => {
    if (!volume) {
      return;
    }
    ref.current.volume = volume / 100;
  }, [volume]);

  const src = useSelector((state: any) => state.bgm.src);
  useEffect(() => {
    if (!src) {
      return;
    }

    ref.current.src = src;
  }, [src]);

  return (
    <Box>
      {children}
      <audio
        autoPlay
        ref={ref}
        preload="auto"
        loop
        style={{
          position: "absolute",
          top: 0,
        }}
      >
        <source src={`${process.env.PUBLIC_URL}/${src}`} type="audio/mpeg" />
      </audio>
    </Box>
  );
};
