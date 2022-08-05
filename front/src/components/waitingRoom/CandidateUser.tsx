import { Avatar, Typography, Box, IconButton } from "@mui/material";
import React, { FC } from "react";
import { WaitingUser } from "../../apis/response/waitingRoomRes";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

interface IProps {
  waitingUser: WaitingUser;
  onClickAccept: (userId: number) => void;
  onClickRefuse: (userId: number) => void;
}

export const CandidateUser: FC<IProps> = ({ waitingUser, onClickAccept, onClickRefuse }) => {
  return (
    <Box display="flex" flexDirection="row" alignItems="center" width="100%">
      <Avatar />
      <Box p={1} />
      <Typography variant="subtitle2" flex={1}>
        {waitingUser.name}
      </Typography>
      <IconButton color="success" onClick={() => onClickAccept(waitingUser.id)} >
        <CheckCircleIcon />
      </IconButton>
      <IconButton color="error" onClick={() => onClickRefuse(waitingUser.id)}>
        <CancelIcon />
      </IconButton>
    </Box>
  );
};
