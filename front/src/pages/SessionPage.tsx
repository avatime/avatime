import React, { FC, useEffect, useState } from "react";
import { ChatRoom } from "../components/chat/ChatRoom";
import { Box, Grid } from "@mui/material";
import { ControllBar } from "../components/session/ControllBar";
import { OpenVidu } from "openvidu-browser";
import { getToken } from "../apis/openViduApi";
import { VideoStream } from "../components/session/VideoStream";
import { grey } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { SessionUser, SessionUserListRes } from "../apis/response/sessionRes";
import { useQuery } from "react-query";
import sessionApi from "../apis/sessionApi";
import { setUserList } from "../stores/slices/meetingSlice";

interface IProps {}

export const SessionPage: FC<IProps> = (props) => {
  const {
    data: { userList },
  } = useQuery<any, SessionUserListRes>(
    "session/getUserList",
    () => sessionApi.requestSessionUserList(8),
    { suspense: true }
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setUserList(
        userList.map((it: SessionUser) => ({
          userId: it.userId,
          userName: it.userName,
          avatarId: it.avatarId,
          avatarName: it.avatarName,
          avatarImagePath: it.avatarImagePath,
        }))
      )
    );
  }, [userList, dispatch]);

  const [opened, setOpened] = useState<boolean[]>([true, true]);
  const cntOpened = opened.filter((it) => it).length;

  const roomId = useSelector((state: any) => state.meeting.roomId);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [publisher, setPublisher] = useState<any>();

  useEffect(() => {
    const openVidu = new OpenVidu();
    const session = openVidu.initSession();

    session.on("streamCreated", (event) => {
      var subscriber = session.subscribe(event.stream, "");
      setSubscribers((prev) => [...prev, subscriber]);
    });

    session.on("streamDestroyed", (event) => {
      setSubscribers((prev) => {
        let index = prev.indexOf(event.stream.streamManager, 0);
        return -1 < index ? prev.splice(index, 1) : prev;
      });
    });

    session.on("exception", (exception) => {
      console.warn(exception);
    });

    getToken(String(roomId)).then((token) => {
      session
        .connect(token, { clientData: "userName" })
        .then(async () => {
          await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
          const devices = await openVidu.getDevices();
          const videoDevices = devices.filter((device) => device.kind === "videoinput");

          const publisher = openVidu.initPublisher("", {
            audioSource: undefined,
            videoSource: videoDevices[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            resolution: "640x480",
            frameRate: 30,
            insertMode: "APPEND",
            mirror: false,
          });

          setPublisher(publisher);
          session.publish(publisher);
        })
        .catch((error) => {
          console.log("There was an error connecting to the session:", error.code, error.message);
        });
    });

    return () => {
      session.disconnect();
      setSubscribers([]);
    };
  }, [roomId, setPublisher]);

  return (
    <Grid container spacing={3} sx={{ float: "left" }} p={2}>
      <Grid item xs={9}>
        <Box height="95vh" display="flex" flexDirection="column">
          <Box borderRadius="10px" flex={1} position="relative" bgcolor={grey[200]}>
            {userList.length === 2 ? (
              <>
                <Box height="95%" p={2}>
                  <VideoStream streamManager={subscribers[0]} name={"아무개"} />
                </Box>
                <Box width="30%" height="30%" p={2} position="absolute" bottom="0" right="0">
                  <VideoStream streamManager={publisher} name={"나나나나"} me={true} />
                </Box>
              </>
            ) : (
              <Box height="100%" display="flex" flexDirection="column" p={2}>
                {publisher && (
                  <>
                    {" "}
                    <Grid container height="95%" spacing={2} alignItems="stretch">
                      <Grid item xs={24 / userList.length}>
                        <VideoStream streamManager={publisher} name={"sdafasdf"} me={true} />
                      </Grid>
                    </Grid>
                  </>
                )}
              </Box>
            )}
          </Box>
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
