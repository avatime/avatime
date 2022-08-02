import { Avatar, Box, Typography } from "@mui/material";
import { url } from "inspector";
import React, { FC } from "react";
import { WaitingUser } from "../../apis/response/waitingRoomRes";
import Crown from "../../assets/crown.png";

interface IProps {
  waitingUser: WaitingUser;
}

export const WaitingUserProfile: FC<IProps> = ({ waitingUser }) => {
  return (
    <Box
      borderRadius="10px"
      bgcolor="white"
      height="100%"
      position="relative"
      display="flex"
      justifyContent="center"
    >
      <Box
        bgcolor={waitingUser.gender === "M" ? "blue" : "red"}
        left="20px"
        right="20px"
        top="20px"
        bottom="20px"
        position="absolute"
        borderRadius="50%"
      >
        <Avatar
          src={waitingUser.profile_img_path}
          alt="profile"
          sx={{
            position: "absolute",
            left: "25px",
            right: "25px",
            top: "25px",
            bottom: "25px",
            width: "auto",
            height: "auto",
          }}
        />
        {waitingUser.type === 0 && (
          <img
            src={Crown}
            alt="방장"
            style={{
              width: "32px",
              height: "32px",
              position: "absolute",
              right: "5px",
              top: "5px",
            }}
          />
        )}
      </Box>
      <Box
        position="absolute"
        bottom="0"
        marginBottom="10px"
        bgcolor="#4d4d4d"
        p={1}
        borderRadius="25px"
      >
        <Typography color="white">{waitingUser.name}</Typography>
      </Box>
    </Box>
  );
};
