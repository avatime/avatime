import { Avatar, Typography, Box, IconButton, useTheme } from "@mui/material";
import React, { FC } from "react";
import { WaitingUser } from "../../apis/response/waitingRoomRes";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

interface IProps {
  waitingUser: WaitingUser;
  onClickAccept: (userId: number) => void;
  onClickRefuse: (userId: number) => void;
  isMaster: boolean;
}

export const CandidateUser: FC<IProps> = ({
  waitingUser,
  onClickAccept,
  onClickRefuse,
  isMaster,
}) => {
  const theme = useTheme();
  return (
    <Box display="flex" flexDirection="row" alignItems="center" width="100%">
      <Avatar
        sx={{
          border: `solid 3px ${
            waitingUser.gender === "M" ? theme.palette.primary.light : theme.palette.error.light
          }`,
        }}
        src={waitingUser.profile_img_path}
      />
      <Box p={1} />
      <Typography variant="subtitle2" flex={1}>
        {waitingUser.name}
      </Typography>
      {isMaster && (
        <>
          <IconButton color="success" onClick={() => onClickAccept(waitingUser.id)}>
            <CheckCircleIcon />
          </IconButton>
          <IconButton color="error" onClick={() => onClickRefuse(waitingUser.id)}>
            <CancelIcon />
          </IconButton>
        </>
      )}
    </Box>
  );
};
