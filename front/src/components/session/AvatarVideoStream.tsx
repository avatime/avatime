import React, { FC } from "react";
import { useRef } from "react";
import { useFaceMask } from "../../hooks/useFaceMesh";
import { StreamManager } from "openvidu-browser";
import { useStream } from "../../hooks/useStream";
import { VideoStreamBox } from "./VideoStreamBox";

interface IProps {
  streamManager: StreamManager;
  name: string;
  avatarPath: string;
  gender: string;
}

export const AvatarVideoStream: FC<IProps> = ({
  streamManager,
  name,
  avatarPath,
  gender,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { videoRef, speaking, micStatus, videoStatus } = useStream(streamManager);
  useFaceMask(videoRef.current, canvasRef.current, avatarPath);

  return (
    <VideoStreamBox
      name={name}
      speaking={speaking}
      micStatus={micStatus}
      videoStatus={videoStatus}
      gender={gender}
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
    </VideoStreamBox>
  );
};
