import React, { FC, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import "../style.css";
import { WaitingRoomList } from "../components/main/WaitingRoomList";
import { MainHeader } from "../components/main/MainHeader";
import { Stack } from "@mui/material";
import { useDispatch } from 'react-redux';
import { addnumber } from "../stores/slices/bgmSlice";

interface IProps {}

export const MainPage: FC<IProps> = (props) => {
  const ref = useRef<any>();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!ref) {
      return;
    }

    ref.current.addEventListener("click", () => {
      dispatch(addnumber());
    })
  }, []);
  return (
    <Stack ref={ref} className="mainback" direction="column" style={{ display: "flex" }}>
      <MainHeader />
      <Box px={3} sx={{ flex: 1 }}>
        <Box p={1} />
        <WaitingRoomList />
      </Box>
    </Stack>
  );
};
