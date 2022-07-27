import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { FC, useEffect } from "react";
import { useRef } from "react";
import { loadBodyPix } from "../../utils/video/backgroundFilter";
import { useSelector } from "react-redux";
import { init, facemesh } from "../../utils/video/facemesh";

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
    init(canvasRef.current);
  }, [streamManager]);

  useEffect(() => {
    if (!videoRef || !canvasRef) {
      return;
    }

    const videoElement = videoRef.current as HTMLVideoElement;
    const canvasElement = canvasRef.current as HTMLCanvasElement;

    if (blurStatus) {
      // videoElement.hidden = true;
      // canvasElement.hidden = false;
      // facemesh(videoElement);
      loadBodyPix(videoElement, canvasElement, () => facemesh(videoElement));
    } else {
      // videoElement.hidden = false;
      // canvasElement.hidden = true;
    }
  }, [streamManager, videoRef, canvasRef, me, blurStatus]);

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
