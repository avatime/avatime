import { Avatar, Box, Typography, IconButton, useTheme } from "@mui/material";
import React, { FC } from "react";
import { WaitingUser } from "../../apis/response/waitingRoomRes";
import Crown from "../../assets/crown.png";
import { SoundIconButton } from "../SoundButton";

interface IProps {
  waitingUser: WaitingUser | null;
  onClickAvatar?: (userId: number) => void;
  me?: boolean;
}

export const WaitingUserProfile: FC<IProps> = ({ waitingUser, onClickAvatar, me }) => {
  const theme = useTheme();
  return (
    <Box
      borderRadius="10px"
      bgcolor="white"
      height="100%"
      position="relative"
      display="flex"
      justifyContent="center"
    >
      {waitingUser && (
        <>
          <Box
            bgcolor={
              waitingUser.gender === "M" ? theme.palette.primary.light : theme.palette.error.light
            }
            left="20px"
            right="20px"
            top="20px"
            bottom="20px"
            position="absolute"
            borderRadius="50%"
          >
            <SoundIconButton
              onClick={() => onClickAvatar!(waitingUser.id)}
              sx={{
                position: "absolute",
                left: "10px",
                right: "10px",
                top: "10px",
                bottom: "10px",
                width: "auto",
                height: "auto",
              }}
            >
              <Avatar
                src={waitingUser.profile_img_path}
                alt="profile"
                sx={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </SoundIconButton>
            {waitingUser.type === 0 && (
              <img
                src={Crown}
                alt="방장"
                style={{
                  width: "24px",
                  height: "24px",
                  position: "absolute",
                  right: "0",
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
            <Typography color="white">{waitingUser.name} {me && " (나)"}</Typography>
          </Box>
        </>
      )}
    </Box>
  );
};
