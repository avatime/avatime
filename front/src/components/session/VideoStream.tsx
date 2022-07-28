import { Box } from "@mui/system";
import React, { FC, useEffect } from "react";
import { useRef } from "react";
import { Typography } from "@mui/material";
import { useFaceMask } from "../../hooks/useFaceMesh";

interface IProps {
  faceMeshModel: any;
  streamManager: any;
  name: string;
}

export const VideoStream: FC<IProps> = ({ faceMeshModel, streamManager, name }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    streamManager.addVideoElement(videoRef.current);
  });

  useFaceMask(faceMeshModel, videoRef.current, canvasRef.current);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <video
        id="streamVideo"
        ref={videoRef}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "10px",
          objectFit: "cover",
        }}
      />

      <canvas
        id="faceCanvas"
        ref={canvasRef}
        tabIndex={1}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          left: 0,
          bottom: 0,
          objectFit: "cover",
          borderRadius: "10px",
          background: "#4d4d4d",
        }}
      />
      <Box position="absolute" bottom={0}>
        <Typography variant="subtitle1" color="white">
          {name}
        </Typography>
      </Box>
    </Box>
  );
};
