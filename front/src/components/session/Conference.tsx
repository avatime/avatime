import React, { FC } from "react";
import { VideoStream } from "./VideoStream";
import { Grid, Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useSelector } from "react-redux";

interface IProps {}

export const Conference: FC<IProps> = (props) => {
  const headCount = useSelector((state: any) => state.meeting.headCount);
  const publisher = useSelector((state: any) => state.meeting.publisher);
  const subscribers = useSelector((state: any) => state.meeting.subscribers);

  return (
    <Box borderRadius="10px" flex={1} position="relative" bgcolor={grey[200]}>
      {headCount === 2 ? (
        <>
          <Box height="95%" p={2}>
            <VideoStream streamManager={subscribers[0]} name={"아무개"} />
          </Box>
          <Box width="30%" height="30%" p={2} position="absolute" bottom="0" right="0">
            <VideoStream streamManager={publisher} name={"나나나나"} />
          </Box>
        </>
      ) : (
        <Box height="100%" display="flex" flexDirection="column" p={2}>
          {publisher && [0, 1].map((it, idx) => (
            <Box flex={1} key={idx}>
              <Grid container height="95%" spacing={2} alignItems="stretch">
                {[publisher, ...subscribers]
                  .slice((it * headCount) / 2, ((it + 1) * headCount) / 2)
                  .map((it, idx) => (
                    <Grid item xs={24 / headCount} key={idx}>
                      <VideoStream streamManager={it} name={"sdafasdf"} />
                    </Grid>
                  ))}
              </Grid>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};
