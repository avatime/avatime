import { Box } from "@mui/system";
import React, { FC, useEffect, useState } from "react";
import { useRef } from "react";
import { Typography } from "@mui/material";
import { useFaceMask } from "../../hooks/useFaceMesh";
import { StreamManager } from "openvidu-browser";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import MicOffIcon from "@mui/icons-material/MicOff";

interface IProps {
  faceMeshModel: any;
  streamManager: StreamManager;
  name: string;
  avatarPath: string;
}

export const VideoStream: FC<IProps> = ({ faceMeshModel, streamManager, name, avatarPath }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [speaking, setSpeaking] = useState<boolean>(false);
  const [micStatus, setMicStatus] = useState<boolean>(streamManager.stream.audioActive);
  const [videoStatus, setVideoStatus] = useState<boolean>(streamManager.stream.videoActive);

  useEffect(() => {
    streamManager.addVideoElement(videoRef.current as HTMLVideoElement);

    streamManager.on("publisherStartSpeaking", (event) => {
      if (event.streamId !== streamManager.stream.streamId) {
        return;
      }
      setSpeaking(true);
    });

    streamManager.on("publisherStopSpeaking", (event) => {
      if (event.streamId !== streamManager.stream.streamId) {
        return;
      }
      setSpeaking(false);
    });

    streamManager.on("streamPropertyChanged", (event) => {
      if (event.stream.streamId !== streamManager.stream.streamId) {
        return;
      }

      if (event.changedProperty === "videoActive") {
        setVideoStatus(event.newValue as boolean);
      } else if (event.changedProperty === "audioActive") {
        setMicStatus(event.newValue as boolean);
      }
    });
  });

  useFaceMask(
    faceMeshModel,
    videoRef.current,
    canvasRef.current,
    avatarPath
  );

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        borderRadius: "10px",
        position: "relative",
        boxShadow: speaking ? "0 0 0 2pt green" : "none",
        transition: "0.3s",
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

      <Box position="absolute" top="5px" right="5px">
        {!micStatus && <MicOffIcon style={{ width: "12px", color: "red" }} />}
        {!videoStatus && <VideocamOffIcon style={{ width: "12px", color: "red" }} />}
      </Box>
    </Box>
  );
};
