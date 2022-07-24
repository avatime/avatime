import { Box } from "@mui/system";
import React, { FC } from "react";
import { SessionUser } from "../../apis/response/sessionRes";

interface IProps {
  sessionUser: SessionUser;
}

export const VideoProfile: FC<IProps> = ({ sessionUser }) => {
  return (
    <Box bgcolor="red" position="relative" width="100%" height="100%" borderRadius="10px">
      <Box position="absolute" bottom={0}>
        {sessionUser.avatarName}
      </Box>
    </Box>
  );
};
