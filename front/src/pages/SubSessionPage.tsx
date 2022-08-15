import { Box, Grid } from "@mui/material";
import React, { FC, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { ControllBar } from "../components/session/ControllBar";
import { VideoStream } from "../components/session/VideoStream";
import { useOpenvidu } from "../hooks/useOpenvidu";
import grey from "@mui/material/colors/grey";
import { useWebSocket } from "../hooks/useWebSocket";
import { useBGM } from "../hooks/useBGM";
import { useLocation, useNavigate } from "react-router";
import { AvatarVideoStream } from "../components/session/AvatarVideoStream";
import { MeetingUserInfoRes } from "../apis/response/sessionRes";
import { Timer } from "../components/timer/Timer";
import { VolumeController } from "../components/VolumeController";

interface IProps {}

export const SubSessionPage: FC<IProps> = (props) => {
  const mainRoomId = useSelector((state: any) => state.meeting.roomId);
  const subRoomId = useSelector((state: any) => state.meeting.subRoomId);
  const userId = useSelector((state: any) => state.user.userId);
  const userName = useSelector((state: any) => state.user.userName);
  const pickUserName = useSelector((state: any) => state.meeting.pickUserName);
  const gender = useSelector((state: any) => state.user.userGender);

  const { publisher, streamList, onChangeCameraStatus, onChangeMicStatus } = useOpenvidu(
    userId,
    subRoomId,
    gender
  );

  const pickUserStreamManager = useMemo(
    () => streamList.find((it) => it.streamManager !== publisher),
    [publisher, streamList]
  );

  const [timer, setTimer] = useState(120);
  useWebSocket({
    onConnect(frame, client) {
      client.subscribe(`/topic/meeting/stuffSubSession/timer/${mainRoomId}`, function (response) {
        setTimer(JSON.parse(response.body));
      });
    },
    beforeDisconnected(frame, client) {
      client.publish({
        destination: "/app/meeting/leave",
        body: JSON.stringify({
          meetingroom_id: subRoomId,
          user_id: userId,
        }),
      });
    },
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (timer === 0) {
      navigate("/session");
    }
  }, [navigate, timer]);

  useBGM("meeting");

  const { state } = useLocation();
  const userInfoList: MeetingUserInfoRes[] = useSelector(
    (state: any) => state.meeting.userInfoList
  );

  return (
    <div className="mainback">
      <Box p={3} display="flex" flexDirection="column" alignItems="stretch" position="relative">
        <Box ml="auto" mb={3}>
          <VolumeController />
        </Box>
        <Box
          p={5}
          borderRadius="10px"
          flex={1}
          position="relative"
          bgcolor={grey[200]}
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          {(state as any)?.stuff && (
            <Box mr="auto" mb={5}>
              <Timer duration={120} remainingTime={timer} />
            </Box>
          )}
          <Grid container height="100%" direction="row" alignItems="center" spacing={5}>
            <Grid item xs>
              {publisher &&
                ((state as any)?.stuff ? (
                  <AvatarVideoStream
                    streamManager={publisher}
                    name={userInfoList.find((it) => it.user_id === userId)!.avatar_name}
                    avatarPath={userInfoList.find((it) => it.user_id === userId)!.avatar_image_path}
                    gender={gender}
                    me={true}
                  />
                ) : (
                  <VideoStream
                    streamManager={publisher}
                    name={userName}
                    gender={gender}
                    me={true}
                  />
                ))}
            </Grid>
            <Box p={2} />
            <Grid item xs>
              {pickUserStreamManager &&
                ((state as any)?.stuff ? (
                  <AvatarVideoStream
                    streamManager={pickUserStreamManager.streamManager}
                    name={
                      userInfoList.find((it) => it.user_id === pickUserStreamManager.userId)!
                        .avatar_name
                    }
                    avatarPath={
                      userInfoList.find((it) => it.user_id === pickUserStreamManager.userId)!
                        .avatar_image_path
                    }
                    gender={gender === "M" ? "F" : "M"}
                    me={false}
                  />
                ) : (
                  <VideoStream
                    streamManager={pickUserStreamManager.streamManager}
                    name={pickUserName}
                    gender={gender === "M" ? "F" : "M"}
                    me={false}
                  />
                ))}
            </Grid>
          </Grid>
        </Box>
        <Box p={1} />
        <ControllBar
          type="normal"
          onChangeMicStatus={onChangeMicStatus}
          onChangeCameraStatus={onChangeCameraStatus}
        />
      </Box>
    </div>
  );
};
