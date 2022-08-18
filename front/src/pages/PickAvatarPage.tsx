import React, { FC, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { MainHeader } from "../components/main/MainHeader";
import { Box, display } from "@mui/system";

import grey from "@mui/material/colors/grey";

import { GaugeBar } from "../components/pickAvatar/GaugeBar";
import { AvatarPickInfoRes } from "../apis/response/avatarRes";

import SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import { SessionModal } from "../components/session/modal/SessionModal";
import { Typography } from "@mui/material";


interface IProps {};


export const PickAvatarPage: FC<IProps> = () => {
  //소켓 통신-----------------------------------------------------------------
  const [originData, setOriginData] = useState<AvatarPickInfoRes[]>([]);
  const [stompClient, setStompClient] = useState<any>();
  useEffect(() => {
    if (stompClient) {
      return;
    }

    const socket = new SockJS("http://localhost:8080/ws/ava");
    const client = Stomp.over(socket);
    client.connect({}, function (frame) {
      console.log("소켓 연결 성공", frame);

      client.subscribe("/topic/getList", function (response) {
        console.log(response.body);
        setOriginData(JSON.parse(response.body));
      });
      client.send("/app/getList", {}, "aaa");
    });

    setStompClient(client);
  }, [stompClient]);




  //----------------------------------------------------------------------------------

  return (
    <div className="mainback" style={{ display: "flex", flexDirection: "column" }}>
      <MainHeader hideSettings={true} />
      <Box flex={1} borderRadius="10px" bgcolor={grey[200]} m={2} p={2}>
        <Grid container spacing={2} direction="column" sx={{ height: "100%" }}>
          {Array.from(Array(3)).map((_, index) => (
            <Grid container item xs spacing={2}>
              {Array.from(Array(8)).map((_, index) => (
                <Grid item xs>
                  <Box sx={{ bgcolor: "white", height: "100%" }}>a</Box>
                </Grid>
              ))}
            </Grid>
          ))}
        </Grid>
      </Box>
      <GaugeBar total={100} current={50}/>
      
    
    </div>
  );
};
