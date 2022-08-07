import React, { FC, useEffect, useState } from "react";
import { ChatRoom } from "../components/chat/ChatRoom";
import { Box, Grid } from "@mui/material";
import { ControllBar } from "../components/session/ControllBar";
import { OpenVidu } from "openvidu-browser";
import { getToken } from "../apis/openViduApi";
import { VideoStream } from "../components/session/VideoStream";
import { grey } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import sessionApi from "../apis/sessionApi";
import { addUserList, clearUserList, removeUserList } from "../stores/slices/meetingSlice";
import { useFaceMeshModel } from "../hooks/useFaceMesh";

interface IProps {}

export const SessionPage: FC<IProps> = (props) => {
  const headCount = useSelector((state: any) => state.waiting.headCount);
  const gender = useSelector((state: any) => state.user.userGender);
  const roomId = useSelector((state: any) => state.meeting.roomId);
  const userId = useSelector((state: any) => state.user.userId);
  const { data: meetingRoomInfo } = useQuery("meeting/getRoomInfo", () =>
    sessionApi.getMeetingRoomInfo({ meetingroom_id: roomId })
  );

  const [opened, setOpened] = useState<boolean[]>([true, true]);
  const cntOpened = opened.filter((it) => it).length;

  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [publisher, setPublisher] = useState<any>();

  const dispatch = useDispatch();

  useEffect(() => {
    const openVidu = new OpenVidu();
    const session = openVidu.initSession();

    session.on("streamCreated",  async (event) => {
      const subscriber = session.subscribe(event.stream, "");
      setSubscribers((prev) => [...prev, subscriber]);
      const res = await sessionApi.getMeetingUserInfo({
        meetingroom_id: roomId,
        stream_id: subscriber.stream.streamId,
      })
      dispatch(addUserList(res));
    });

    session.on("streamDestroyed", (event) => {
      setSubscribers((prev) => {
        let index = prev.indexOf(event.stream.streamManager, 0);
        return -1 < index ? prev.splice(index, 1) : prev;
      });
      dispatch(removeUserList(userId));

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
          dispatch(clearUserList());
          sessionApi.patchRegisterStreamId({
            meetingroom_id: roomId,
            user_id: userId,
            stream_id: publisher.stream.streamId,
          });
        })
        .catch((error) => {
          console.log("There was an error connecting to the session:", error.code, error.message);
        });
    });

    return () => {
      session.disconnect();
      setSubscribers([]);
    };
  }, [dispatch, roomId, setPublisher, userId]);

  const faceMeshModel = useFaceMeshModel();

  return (
    <Grid container spacing={3} sx={{ float: "left" }} p={2}>
      <Grid item xs={9}>
        <Box height="95vh" display="flex" flexDirection="column">
          <Box borderRadius="10px" flex={1} position="relative" bgcolor={grey[200]}>
            {headCount === 2 ? (
              <>
                <Box height="95%" p={2}>
                  <VideoStream
                    faceMeshModel={faceMeshModel}
                    streamManager={subscribers[0]}
                    name={"아무개"}
                    avatarPath={""}
                  />
                </Box>
                <Box width="30%" height="30%" p={2} position="absolute" bottom="0" right="0">
                  <VideoStream
                    faceMeshModel={faceMeshModel}
                    streamManager={publisher}
                    name={"나나나나"}
                    avatarPath={""}
                  />
                </Box>
              </>
            ) : (
              <Box height="100%" display="flex" flexDirection="column" p={2}>
                {publisher &&
                  [0, 1].map((it, idx) => (
                    <Box flex={1} key={idx}>
                      <Grid container height="95%" spacing={2} alignItems="stretch">
                        {[publisher, ...subscribers]
                          .slice((it * headCount) / 2, ((it + 1) * headCount) / 2)
                          .map((it, idx) => (
                            <Grid item xs={24 / headCount} key={idx}>
                              <VideoStream
                                faceMeshModel={faceMeshModel}
                                streamManager={it}
                                name={it.stream.streamId}
                                avatarPath={
                                  it === publisher
                                    ? `${process.env.PUBLIC_URL}/sampleMask2.jpg`
                                    : `${process.env.PUBLIC_URL}/sampleMask1.jpg`
                                }
                              />
                            </Grid>
                          ))}
                      </Grid>
                    </Box>
                  ))}
              </Box>
            )}
          </Box>
          <Box p={1} />
          <ControllBar type="master" />
        </Box>
      </Grid>
      <Grid item xs={3}>
        <Box display="flex" flexDirection="column" height="95vh" sx={{ overflow: "hidden" }}>
          {meetingRoomInfo && (
            <ChatRoom
              chatType="all"
              isOpened={opened[0]}
              onClickHeader={() => {
                setOpened((prev) => [!prev[0], prev[1]]);
              }}
              maxHeight={opened[0] && cntOpened === 1 ? "100%" : "50%"}
              chattingRoomId={meetingRoomInfo.chattingroom_id}
            />
          )}
          {meetingRoomInfo && (
            <ChatRoom
              chatType="gender"
              isOpened={opened[1]}
              onClickHeader={() => {
                setOpened((prev) => [prev[0], !prev[1]]);
              }}
              maxHeight={opened[1] && cntOpened === 1 ? "100%" : "50%"}
              chattingRoomId={
                gender === "M"
                  ? meetingRoomInfo.men_chattingroom_id
                  : meetingRoomInfo.women_chattingroom_id
              }
            />
          )}
        </Box>
      </Grid>
    </Grid>
  );
};
