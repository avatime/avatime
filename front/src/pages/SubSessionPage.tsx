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
      <Grid container  p={2}>
        <Grid item xs>
          <Box  display="flex" flexDirection="column">
            <Box borderRadius="10px" flex={1} position="relative" bgcolor={grey[200]}>
              <Box height="95%" p={2}>
                {pickUserStreamManager && (
                  <VideoStream
                    streamManager={
                      streamList.find((it) => it.streamManager !== publisher).streamManager
                    }
                    name={pickUserName}
                  />
                )}
              </Box>
              {publisher && (
                <Box width="30%" height="30%" p={2} position="absolute" bottom="0" right="0">
                  <VideoStream streamManager={publisher} name={userName} />
                </Box>
              )}
            </Box>
            <Box p={1} />
            <ControllBar
              type="normal"
              onChangeMicStatus={onChangeMicStatus}
              onChangeCameraStatus={onChangeCameraStatus}
              lastPickModalOpen={false}
            />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};
