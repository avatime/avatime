import { Box, Grid } from "@mui/material";
import React, { FC, useMemo } from "react";
import { useSelector } from "react-redux";
import { ControllBar } from "../components/session/ControllBar";
import { VideoStream } from "../components/session/VideoStream";
import { useOpenvidu } from "../hooks/useOpenvidu";
import grey from "@mui/material/colors/grey";

interface IProps {}

export const SubSessionPage: FC<IProps> = (props) => {
  const subRoomId = useSelector((state: any) => state.meeting.subRoomId);
  const userId = useSelector((state: any) => state.user.userId);
  const userName = useSelector((state: any) => state.user.userName);
  const pickUserName = useSelector((state: any) => state.meeting.pickUserName);

  const { publisher, streamList, onChangeCameraStatus, onChangeMicStatus } = useOpenvidu(
    userId,
    subRoomId
  );

  const pickUserStreamManager = useMemo(
    () => streamList.find((it) => it.streamManager !== publisher)?.streamManager,
    [publisher, streamList]
  );

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
              {publisher && <VideoStream streamManager={publisher} name={userName} />}
            </Grid>
            <Grid item xs>
              {pickUserStreamManager && (
                <VideoStream streamManager={pickUserStreamManager} name={pickUserName} />
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
