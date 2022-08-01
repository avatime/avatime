import React, { FC, useState } from "react";
import { ChatRoom } from "../components/chat/ChatRoom";
import { Box, Grid } from "@mui/material";
import { grey } from "@mui/material/colors";
import { MainHeader } from "../components/main/MainHeader";

import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
interface IProps {}

export const WaitingPage: FC<IProps> = (props) => {
  const [opened, setOpened] = useState<boolean[]>([true, true]);
  //const cntOpened = opened.filter((it) => it).length;

  return (
    <div className="mainback">
      <MainHeader />
      <Grid container spacing={3} sx={{ float: "left" }} p={2}>
        <Grid item xs={9}>
          <Box height="80%" display="flex" flexDirection="column">
            <Box borderRadius="10px" flex={1} position="relative" bgcolor={grey[200]}></Box>
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
              maxHeight={"70%"}
              chattingRoomId={1}
            />
          </Box>
          <Button variant="outlined" startIcon={<DeleteIcon />}>
            Delete
          </Button>
          <Button variant="contained" endIcon={<SendIcon />}>
            Send
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};
