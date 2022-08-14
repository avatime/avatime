import React, { FC } from "react";
import { useRef } from "react";
import { useFaceMask } from "../../hooks/useFaceMesh";
import { StreamManager } from "openvidu-browser";
import { useStream } from "../../hooks/useStream";
import { VideoStreamBox } from "./VideoStreamBox";
import { Box, Tooltip, Typography, useTheme } from "@mui/material";
import { useSelector } from 'react-redux';

interface IProps {
  streamManager: StreamManager;
  name: string;
  avatarPath: string;
  gender: string;
  me: boolean;
  balance?: boolean;
}

export const AvatarVideoStream: FC<IProps> = ({
  streamManager,
  name,
  avatarPath,
  gender,
  me,
  balance,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { videoRef, speaking, micStatus, videoStatus } = useStream(streamManager);
  useFaceMask(videoRef.current, canvasRef.current, avatarPath);

  const theme = useTheme();

  const balanceA = useSelector((state: any) => state.meeting.balanceA);
  const balanceB = useSelector((state: any) => state.meeting.balanceB);

  return (
    <VideoStreamBox
      name={name}
      speaking={speaking}
      micStatus={micStatus}
      videoStatus={videoStatus}
      gender={gender}
      me={me}
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
          backgroundImage: `url(가상배경.png)`,
        }}
      />

      {balance !== undefined && (
        <Tooltip title={balance ? balanceA : balanceB}>
          <Box
            position="absolute"
            width="50px"
            height="50px"
            top={0}
            right={0}
            p={2}
            m={2}
            bgcolor={balance ? theme.palette.error.main : theme.palette.info.main}
            borderRadius="50%"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="h3" color="white" textAlign="center" pt={0.3}>
              {balance ? "A" : "B"}
            </Typography>
          </Box>
        </Tooltip>
      )}
    </VideoStreamBox>
  );
};
