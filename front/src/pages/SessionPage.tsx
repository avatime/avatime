import React, { FC, useEffect, useState } from "react";
import { Conference } from "../components/session/Conference";
import { ChatRoom } from "../components/chat/ChatRoom";
import { Box, Grid } from "@mui/material";
import { ControllBar } from "../components/session/ControllBar";
import { OpenVidu } from "openvidu-browser";
import { useDispatch, useSelector } from 'react-redux';
import {
  clearSubscribers,
  pushSubscribers,
  removeSubscribers,
  setCurrentVideoDevice,
  setPublisher,
} from "../stores/slices/meetingSlice";
import { getToken } from "../apis/openViduApi";

interface IProps {}

export const SessionPage: FC<IProps> = (props) => {
  const [opened, setOpened] = useState<boolean[]>([true, true]);
  const cntOpened = opened.filter((it) => it).length;


  const roomId = useSelector((state: any) => state.meeting.roomId);
  const dispatch = useDispatch();

  useEffect(() => {
    const openVidu = new OpenVidu()
    const session = openVidu.initSession();

    session.on("streamCreated", (event) => {
      var subscriber = session.subscribe(event.stream, "");
      dispatch(pushSubscribers(subscriber));
    });

    session.on("streamDestroyed", (event) => {
      dispatch(removeSubscribers(event.stream.streamManager));
    });

    session.on("exception", (exception) => {
      console.warn(exception);
    });


    getToken(String(roomId)).then((token) => {
      // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
      // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
      session
        .connect(token, { clientData: "userName" })
        .then(async () => {
          await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
          var devices = await openVidu.getDevices();
          var videoDevices = devices.filter((device) => device.kind === "videoinput");

          // --- 5) Get your own camera stream ---

          // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
          // element: we will manage it on our own) and with the desired properties
          let publisher = openVidu.initPublisher("", {
            audioSource: undefined, // The source of audio. If undefined default microphone
            videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
            publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
            publishVideo: true, // Whether you want to start publishing with your video enabled or not
            resolution: "640x480", // The resolution of your video
            frameRate: 30, // The frame rate of your video
            insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
            mirror: false, // Whether to mirror your local video or not
          });

          // --- 6) Publish your stream ---

          session.publish(publisher);
          dispatch(setPublisher(publisher));
          dispatch(setCurrentVideoDevice(videoDevices[0]));
        })
        .catch((error) => {
          console.log("There was an error connecting to the session:", error.code, error.message);
        });
    });

    return () => {
      session.disconnect();
      dispatch(clearSubscribers());
      dispatch(setPublisher(undefined));
      dispatch(setCurrentVideoDevice(undefined));
    };
  }, [dispatch, roomId]);

  return (
    <Grid container spacing={3} sx={{ float: "left" }} p={2}>
      <Grid item xs={9}>
        <Box height="95vh" display="flex" flexDirection="column">
          <Conference />
          <Box p={1} />
          <ControllBar type="master" />
        </Box>
      </Grid>
      <Grid item xs={3}>
        <Box display="flex" flexDirection="column" height="95vh" sx={{ overflow: "hidden" }}>
          <ChatRoom
            chatType="all"
            isOpened={opened[0]}
            onClickHeader={() => {
              setOpened((prev) => [!prev[0], prev[1]]);
            }}
            maxHeight={opened[0] && cntOpened === 1 ? "100%" : "50%"}
          />
          <ChatRoom
            chatType="gender"
            isOpened={opened[1]}
            onClickHeader={() => {
              setOpened((prev) => [prev[0], !prev[1]]);
            }}
            maxHeight={opened[1] && cntOpened === 1 ? "100%" : "50%"}
          />
        </Box>
      </Grid>
    </Grid>
  );
};
