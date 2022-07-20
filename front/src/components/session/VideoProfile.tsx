import { Card, CardMedia } from "@mui/material";
import { Box } from "@mui/system";
import React, { FC } from "react";
import { SessionUser } from "../../apis/response/sessionRes";

interface IProps {
    sessionUser: SessionUser,
}

export const VideoProfile: FC<IProps> = ({sessionUser}) => {
  const styleGrid = {
    backgroundColor: "red",
    position: "relative",
    width: "100%",
    height: "100%"
  };

  return (
    <Card sx={styleGrid}>
      <CardMedia>
        <Box position="absolute" bottom={0}>{sessionUser.name}</Box>
      </CardMedia>
    </Card>
  );
};
