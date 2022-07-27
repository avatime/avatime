import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { FC, useEffect } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useFaceMesh } from "../../hooks/useFaceMesh";

interface IProps {
  streamManager: any;
  name: string;
  me?: boolean;
}

export const VideoStream: FC<IProps> = ({ streamManager, name, me = false }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const blurStatus = useSelector((state: any) => state.meeting.blurStatus);

  useEffect(() => {
    streamManager.addVideoElement(videoRef.current);
  }, [streamManager]);

  useFaceMesh(videoRef, canvasRef, blurStatus);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <video
        ref={videoRef}
        width="640"
        height="480"
        style={{
          width: "100%",
          borderRadius: "10px",
          objectFit: "cover",
          flex: 1,
        }}
        autoPlay
      />
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          borderRadius: "10px",
          flex: 1,
          objectFit: "cover",
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
