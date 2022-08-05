import React, { Children, FC, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import "../style.css";
import { WaitingRoomList } from "../components/main/WaitingRoomList";
import { MainHeader } from "../components/main/MainHeader";
import { Add } from "@mui/icons-material";
import { useQuery } from "react-query";
import { ageApi, makeNewRoomApi, sidoApi } from "../apis/waitingRoomApi";


import { useDispatch, useSelector } from "react-redux";
import {
  setAge,
  setHeadCount,
  setMaster,
  setRegion,
  setRoomName,
  setWaitingRoomId,
} from "../stores/slices/waitingSlice";
import { AgeRes, SidoRes } from "../apis/response/waitingRoomRes";
import { Stack } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  height: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
};

const counts = [
  {
    value: "4",
    label: "2:2",
  },
  {
    value: "6",
    label: "3:3",
  },
  {
    value: "8",
    label: "4:4",
  },
];

interface IProps {}

export const MainPage: FC<IProps> = (props) => {

 
  return (
    <Stack className="mainback" direction="column" style={{display:"flex"}}>
      <MainHeader />
      <Box px={3} sx={{  flex: 1 }}>
        <Box p={1} />
        <WaitingRoomList />
    
      </Box>
    </Stack>
  );
};
