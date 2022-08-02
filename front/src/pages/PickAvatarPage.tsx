import React, { FC, useState } from "react";
import Grid from "@mui/material/Grid";
import { MainHeader } from "../components/main/MainHeader";
import { Box, display } from "@mui/system";

import grey from "@mui/material/colors/grey";

import { GaugeBar } from "../components/pickAvatar/GaugeBar";

interface IProps {};


export const PickAvatarPage: FC<IProps> = () => {
  

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
