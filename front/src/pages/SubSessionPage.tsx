import { Box, Grid } from "@mui/material";
import React, { FC, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { ControllBar } from "../components/session/ControllBar";
import { VideoStream } from "../components/session/VideoStream";
import { useOpenvidu } from "../hooks/useOpenvidu";
import grey from "@mui/material/colors/grey";
import { WS_BASE_URL } from "../apis/url";
import SockJS from "sockjs-client";
import * as Stomp from "stompjs";

interface IProps {}

export const SubSessionPage: FC<IProps> = (props) => {
  const subRoomId = useSelector((state: any) => state.meeting.subRoomId);
  const userId = useSelector((state: any) => state.user.userId);
  const userName = useSelector((state: any) => state.user.userName);
  const pickUserName = useSelector((state: any) => state.meeting.pickUserName);
  const gender = useSelector((state: any) => state.user.userGender);

  const { publisher, streamList, onChangeCameraStatus, onChangeMicStatus } = useOpenvidu(
    userId,
    subRoomId
  );

  const pickUserStreamManager = useMemo(
    () => streamList.find((it) => it.streamManager !== publisher)?.streamManager,
    [publisher, streamList]
  );

  useEffect(() => {
    if (!subRoomId || !userId) {
      return;
    }

    const socket = new SockJS(WS_BASE_URL);
    const client = Stomp.over(socket);

    client.connect({}, function (frame) {
      console.log("소켓 연결 성공", frame);
    });

    return () => {
      client.send(
        "/app/meeting/leave",
        {},
        JSON.stringify({
          meetingroom_id: subRoomId,
          user_id: userId,
        })
      );
      client.disconnect(() => {});
    };
  }, [subRoomId, userId]);

  return (
    <div className="mainback">
      <Box p={3} display="flex" flexDirection="column" alignItems="stretch" position="relative">
        <Box
          p={3}
          borderRadius="10px"
          flex={1}
          position="relative"
          bgcolor={grey[200]}
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Grid container direction="row" alignItems="center" spacing={3}>
            <Grid item xs>
              {publisher && (
                <VideoStream streamManager={publisher} name={userName} gender={gender} />
              )}
            </Grid>
            <Grid item xs>
              {pickUserStreamManager && (
                <VideoStream
                  streamManager={pickUserStreamManager}
                  name={pickUserName}
                  gender={gender === "M" ? "F" : "M"}
                />
              )}
            </Grid>
          </Grid>
        </Box>
        <Box p={1} />
        <ControllBar
          type="normal"
          onChangeMicStatus={onChangeMicStatus}
          onChangeCameraStatus={onChangeCameraStatus}
          lastPickModalOpen={false}
        />
      </Box>
    </div>
  );
};
