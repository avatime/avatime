import React, { FC, useEffect, useState, useCallback, useMemo } from "react";
import { ChatRoom } from "../components/chat/ChatRoom";
import { Box, Grid, CircularProgress } from "@mui/material";
import { ControllBar } from "../components/session/ControllBar";
import { OpenVidu } from "openvidu-browser";
import { getToken } from "../apis/openViduApi";
import { VideoStream } from "../components/session/VideoStream";
import { grey } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import sessionApi from "../apis/sessionApi";
import { setUserInfoList } from "../stores/slices/meetingSlice";
import { useFaceMeshModel } from "../hooks/useFaceMesh";
import SockJS from "sockjs-client";
import { WS_BASE_URL } from "../apis/url";
import * as Stomp from "stompjs";
import { MeetingRoomInfoRes } from "../apis/response/sessionRes";

interface IProps {}

export const SessionPage: FC<IProps> = (props) => {
  const headCount = useSelector((state: any) => state.waiting.headCount);
  const gender = useSelector((state: any) => state.user.userGender);
  const roomId = useSelector((state: any) => state.meeting.roomId);
  const userId = useSelector((state: any) => state.user.userId);
  const dispatch = useDispatch();

  const [meetingRoomInfo, setMeetingRoomInfo] = useState<MeetingRoomInfoRes>();
  useEffect(() => {
    if (meetingRoomInfo) {
      return;
    }

    sessionApi.getMeetingRoomInfo({ meetingroom_id: roomId }).then((res: MeetingRoomInfoRes) => {
      console.log("AAA", res);
      setMeetingRoomInfo(res);
      dispatch(setUserInfoList(res.meeting_user_info_list));
    });
  }, [dispatch, meetingRoomInfo, roomId]);

  const [opened, setOpened] = useState<boolean[]>([true, true]);
  const cntOpened = opened.filter((it) => it).length;

  useEffect(() => {
    if (!roomId) {
      return;
    }

    const socket = new SockJS(WS_BASE_URL);
    const client = Stomp.over(socket);

    client.connect({}, function (frame) {
      console.log("소켓 연결 성공", frame);
    });

    return () => {
      client.disconnect(() => {});
    };
  }, [roomId]);

  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [publisher, setPublisher] = useState<any>();

  useEffect(() => {
    const openVidu = new OpenVidu();
    const session = openVidu.initSession();

    session.on("streamCreated", async (event) => {
      const subscriber = session.subscribe(event.stream, "");
      setSubscribers((prev) => [...prev, { stream: subscriber, userId: +event.stream.connection.data }]);
    });

    session.on("streamDestroyed", (event) => {
      setSubscribers((prev) => {
        let index = prev.findIndex((it) => it.subscriber === event.stream);
        return -1 < index ? prev.splice(index, 1) : prev;
      });
    });

    session.on("exception", (exception) => {
      console.warn(exception);
    });

    getToken(String(roomId)).then((token) => {
      session
        .connect(token, userId)
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
  }, [roomId, userId]);

  const faceMeshModel = useFaceMeshModel();

  const onChangeCameraStatus = useCallback(
    (status: boolean) => {
      publisher?.publishVideo(status);
    },
    [publisher]
  );

  const onChangeMicStatus = useCallback(
    (status: boolean) => {
      publisher?.publishAudio(status);
    },
    [publisher]
  );

  const streamList = useMemo(
    () => [{ stream: publisher, userId }, ...subscribers],
    [publisher, subscribers, userId]
  );

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
                    streamManager={subscribers[0].stream}
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
                        {meetingRoomInfo && meetingRoomInfo?.meeting_user_info_list
                          .slice((it * headCount) / 2, ((it + 1) * headCount) / 2)
                          .map((userInfo, idx) => (
                            <Grid item xs={24 / headCount} key={idx} sx={{ position: "relative" }}>
                              <VideoStream
                                faceMeshModel={faceMeshModel}
                                streamManager={streamList.find(
                                  (it) => it.userId === userInfo.user_id
                                ).stream}
                                name={userInfo.avatar_name}
                                avatarPath={userInfo.avatar_image_path}
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
          <ControllBar
            type="master"
            onChangeMicStatus={onChangeMicStatus}
            onChangeCameraStatus={onChangeCameraStatus}
          />
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
