import React, { FC, useState } from "react";
import { Conference } from "../components/session/Conference";
import { ChatRoom } from "../components/chat/ChatRoom";
import { Box, Grid } from "@mui/material";
import useWindowSize from "../hooks/useWindowSize";
import { ControllBar } from "../components/session/ControllBar";

interface IProps {}

export const SessionPage: FC<IProps> = (props) => {
  const [opened, setOpened] = useState<boolean[]>([true, true]);
  const cntOpened = opened.filter((it) => it).length;

  const { windowSize } = useWindowSize();

  const fullHeight = `${windowSize.height * 0.64}px`;
  const halfHeight = `${windowSize.height * 0.23}px`;

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
        <Box
          display="flex"
          flexDirection="column"
          sx={{ overflow: "hidden" }}
        >
          <ChatRoom
            chatType="all"
            isOpened={opened[0]}
            onClickHeader={() => {
              setOpened((prev) => [!prev[0], prev[1]]);
            }}
            maxHeight={opened[0] && cntOpened === 1 ? fullHeight : halfHeight}
          />
          <ChatRoom
            chatType="gender"
            isOpened={opened[1]}
            onClickHeader={() => {
              setOpened((prev) => [prev[0], !prev[1]]);
            }}
            maxHeight={opened[1] && cntOpened === 1 ? fullHeight : halfHeight}
          />
        </Box>
      </Grid>
    </Grid>
  );
};
