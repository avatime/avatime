import { Box, Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import { ChatRes } from "../../apis/response/chatRes";

interface IProps {
  chatRes: ChatRes;
}

export const ChatBlock: FC<IProps> = ({ chatRes }) => {
  return (
    <Stack mb={2}>
      <Stack direction="row" alignItems="flex-end" spacing={2}>
        <Typography variant="subtitle1">{chatRes.name}</Typography>
        <Typography variant="subtitle2">{chatRes.time}</Typography>
      </Stack>
      <Stack alignItems="flex-start">
        <Typography className="chat__bubble" variant="subtitle2">
          {chatRes.message}
        </Typography>
      </Stack>
    </Stack>
  );
};
