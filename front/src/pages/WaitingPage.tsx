import React, { FC, useState } from "react";
import { ChatRoom } from "../components/chat/ChatRoom";
import { Box, Grid } from "@mui/material";
import { grey } from "@mui/material/colors";
import { MainHeader } from "../components/main/MainHeader";
import "../components/chat/style.css";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";

interface IProps {}

export const WaitingPage: FC<IProps> = (props) => {
  const [opened, setOpened] = useState<boolean[]>([true, true]);
  //const cntOpened = opened.filter((it) => it).length;

  return (
    <div className="mainback" style={{ display: "flex", flexDirection: "column" }}>
      <MainHeader hideSettings={true} />
      <Grid container spacing={3} p={2} sx={{ flex: "1" }}>
        <Grid item xs={9} sx={{ float: "left", display: "flex", flexDirection: "column" }}>
          <Box flex={1} borderRadius="10px" bgcolor={grey[200]} p={2}>
            <Grid container spacing={2}>
              <Grid item xs bgcolor="blue">
                <Box bgcolor="red">a</Box>
              </Grid>
              <Grid item xs  bgcolor="blue">
              <Box bgcolor="red">a</Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={3} sx={{ float: "left", display: "flex", flexDirection: "column" }}>
          <Box display="flex" flexDirection="column" flex={1}>
            <ChatRoom
              chatType="all"
              isOpened={opened[0]}
              onClickHeader={() => {
                setOpened((prev) => [!prev[0], prev[1]]);
              }}
              maxHeight="100%"
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
