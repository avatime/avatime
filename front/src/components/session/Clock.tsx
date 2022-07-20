import { Box, Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

interface IProps {}

export const Clock: FC<IProps> = (props) => {
  return (
    <Stack direction="row" alignItems="center">
      <AccessTimeIcon fontSize="large" />
      <Box p={1} />
      <Typography component="div" variant="h5">10:00</Typography>
    </Stack>
  );
};
