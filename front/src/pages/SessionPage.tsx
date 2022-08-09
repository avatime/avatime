import React, { FC, useEffect, useState } from "react";
import { ChatRoom } from "../components/chat/ChatRoom";
import { Box, Grid } from "@mui/material";
import { ControllBar } from "../components/session/ControllBar";
import { grey } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import sessionApi from "../apis/sessionApi";
import { setUserInfoList } from "../stores/slices/meetingSlice";
import { useFaceMeshModel } from "../hooks/useFaceMesh";
import SockJS from "sockjs-client";
import { WS_BASE_URL } from "../apis/url";
import * as Stomp from "stompjs";
import { MeetingRoomInfoRes } from "../apis/response/sessionRes";
import { useOpenvidu } from "../hooks/useOpenvidu";
import { AvatarVideoStream } from "../components/session/AvatarVideoStream";

interface IProps {}

export const SessionPage: FC<IProps> = (props) => {
  const headCount = useSelector((state: any) => state.waiting.headCount);
  const gender = useSelector((state: any) => state.user.userGender);
  const roomId = useSelector((state: any) => state.meeting.roomId);
  const userId = useSelector((state: any) => state.user.userId);
  const isMaster = useSelector((state: any) => state.waiting.isMaster);
  const dispatch = useDispatch();

  const [meetingRoomInfo, setMeetingRoomInfo] = useState<MeetingRoomInfoRes>();
  useEffect(() => {
    if (meetingRoomInfo) {
      return;
    }

    sessionApi.getMeetingRoomInfo({ meetingroom_id: roomId }).then((res: MeetingRoomInfoRes) => {
      setMeetingRoomInfo(res);
      dispatch(setUserInfoList(res.meeting_user_info_list));
    });
  }, [dispatch, meetingRoomInfo, roomId]);

  const [opened, setOpened] = useState<boolean[]>([true, true]);
  const cntOpened = opened.filter((it) => it).length;

  const [lastPickModalOpen, setLastPickModalOpen] = useState(false);

  useEffect(() => {
    if (!roomId) {
      return;
    }

    const socket = new SockJS(WS_BASE_URL);
    const client = Stomp.over(socket);

    client.connect({}, function (frame) {
      console.log("소켓 연결 성공", frame);

      client.subscribe(`/topic/meeting/status/{roomId}`, function (response) {
        console.log(response.body);
        if (JSON.parse(response.body).last_pick_status) {
          setLastPickModalOpen(true);
        }
      });
    });

    return () => {
      client.disconnect(() => {});
    };
  }, [roomId]);

  const faceMeshModel = useFaceMeshModel();
  const { publisher, streamList, onChangeCameraStatus, onChangeMicStatus } = useOpenvidu(
    userId,
    roomId
  );

  return (
    <div className="mainback">
      <Grid container spacing={3} sx={{ float: "left" }} p={2}>
        <Grid item xs={9}>
          <Box height="95vh" display="flex" flexDirection="column">
            <Box borderRadius="10px" flex={1} position="relative" bgcolor={grey[200]}>
              {publisher && (
                <Box height="100%" display="flex" flexDirection="column" p={2}>
                  {meetingRoomInfo &&
                    [0, 1].map((it, idx) => (
                      <Box flex={1} key={idx} height="50%">
                        <Grid container height="100%" spacing={2} alignItems="stretch">
                          {streamList
                            .slice((it * headCount) / 2, ((it + 1) * headCount) / 2)
                            .map((stream, idx) => {
                              const userInfo = meetingRoomInfo.meeting_user_info_list.find(
                                (it) => it.user_id === stream.userId
                              );
                              return (
                                <Grid
                                  item
                                  xs={24 / headCount}
                                  key={idx}
                                  sx={{ position: "relative", height: "100%" }}
                                >
                                  <AvatarVideoStream
                                    faceMeshModel={faceMeshModel}
                                    streamManager={stream.streamManager}
                                    name={userInfo!.avatar_name}
                                    avatarPath={userInfo!.avatar_image_path}
                                  />
                                </Grid>
                              );
                            })}
                        </Grid>
                      </Box>
                    ))}
                </Box>
              )}
            </Box>
            <Box p={1} />
            <ControllBar
              type={isMaster ? "master" : "normal"}
              onChangeMicStatus={onChangeMicStatus}
              onChangeCameraStatus={onChangeCameraStatus}
              lastPickModalOpen={lastPickModalOpen}
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
    </div>
  );
};
