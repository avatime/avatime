import React, { FC } from "react";
import Box from "@mui/material/Box";
import "../style.css";
import { WaitingRoomList } from "../components/main/WaitingRoomList";
import { MainHeader } from "../components/main/MainHeader";
import { Stack } from "@mui/material";

interface IProps {}

export const MainPage: FC<IProps> = (props) => {
  return (
    <Stack className="mainback" direction="column" style={{ display: "flex" }}>
      <MainHeader />
      <Box px={3} sx={{ flex: 1 }}>
        <Box p={1} />
        <WaitingRoomList />
      </Box>
    </Stack>
  );
};
