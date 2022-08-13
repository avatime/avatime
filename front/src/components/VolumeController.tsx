import { VolumeUp } from "@mui/icons-material";
import { Box, Slider, Stack } from "@mui/material";
import React, { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBgmPlaying, setBgmVolume } from "../stores/slices/bgmSlice";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";

interface IProps {}

export const VolumeController: FC<IProps> = (props) => {
  const dispatch = useDispatch();
  const volume = useSelector((state: any) => state.bgm.volume);
  const onChangeVolume = (event: any, value: number | number[]) => {
    dispatch(setBgmVolume(value as number));
    dispatch(setBgmPlaying(!!value));
  };

  if (volume === undefined) {
    return null;
  }

  return (
    <Box sx={{ width: 100 }}>
      <Stack spacing={2} direction="row" alignItems="center">
        {volume === 0 ? <VolumeOffIcon /> : <VolumeUp />}
        <Slider
          color="secondary"
          aria-label="Volume"
          value={volume}
          onChange={onChangeVolume}
          min={0}
          max={100}
        />
      </Stack>
    </Box>
  );
};
