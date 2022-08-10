import { Box } from "@mui/system";
import React, { FC } from "react";
import { Typography, useTheme } from "@mui/material";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import MicOffIcon from "@mui/icons-material/MicOff";

interface IProps {
  name: string;
  speaking: boolean;
  micStatus: boolean;
  videoStatus: boolean;
  gender: string;
  me: boolean;
  children: React.ReactNode;
}

export const VideoStreamBox: FC<IProps> = ({
  name,
  speaking,
  micStatus,
  videoStatus,
  gender,
  me,
  children,
}) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        borderRadius: "10px",
        position: "relative",
        boxShadow: speaking ? "0 0 0 2pt green" : "none",
        transition: "0.3s",
      }}
    >
      {children}

      <Box
        position="absolute"
        bottom={0}
        p={1}
        m={1}
        bgcolor={gender === "M" ? theme.palette.primary.light : theme.palette.error.light}
        borderRadius="10px"
      >
        <Typography variant="subtitle1" color="white">
          {name}
          {me && " (나)"}
        </Typography>
      </Box>

      <Box position="absolute" top="5px" right="5px">
        {!micStatus && <MicOffIcon style={{ width: "12px", color: "red" }} />}
        {!videoStatus && <VideocamOffIcon style={{ width: "12px", color: "red" }} />}
      </Box>
    </Box>
  );
};
