import React, { FC } from "react";
import { StreamManager } from "openvidu-browser";
import { useStream } from "../../hooks/useStream";
import { VideoStreamBox } from "./VideoStreamBox";

interface IProps {
  streamManager: StreamManager;
  name: string;
}

export const VideoStream: FC<IProps> = ({ streamManager, name }) => {
  const { videoRef, speaking, micStatus, videoStatus } = useStream(streamManager);

  return (
    <VideoStreamBox
      name={name}
      speaking={speaking}
      micStatus={micStatus}
      videoStatus={videoStatus}
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
    </VideoStreamBox>
  );
};
