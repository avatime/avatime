import { Box } from "@mui/system";
import React, { FC, useEffect } from "react";
import { useRef } from "react";
import { Typography } from "@mui/material";

interface IProps {
  streamManager: any;
  name: string;
}

export const VideoStream: FC<IProps> = ({ streamManager, name }) => {
  const ref = useRef(null);

  useEffect(() => {
    streamManager.addVideoElement(ref.current);
  });

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <video
        ref={ref}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "10px",
          objectFit: "cover"
        }}
      ></video>
      <Box position="absolute" bottom={0}>
        <Typography variant="subtitle1" color="white">
          {name}
        </Typography>
      </Box>
    </Box>
  );
};
