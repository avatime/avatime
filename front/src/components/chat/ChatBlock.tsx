import { Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import { ChatRes } from "../../apis/response/chatRes";
import { formatDate } from "../../utils/day";

type Order = "left" | "right";

interface IProps {
  chatRes: ChatRes;
  order: Order;
  showTime: boolean;
  showName: boolean;
}

export const ChatBlock: FC<IProps> = ({ chatRes, order, showTime, showName }) => {
  return (
    <Stack alignItems="stretch" pl={2} pr={2} p={0.5} pb={showTime ? 1 : 0} ml={1} mr={1}>
      {order === "left" && showName ? (
        <Stack direction="row">
          <Typography variant="subtitle1">{chatRes.name}</Typography>
        </Stack>
      ) : null}

      <Stack direction={order === "left" ? "row" : "row-reverse"} alignItems="flex-end">
        <Typography
          className={`chat__bubble__${order} chat__bubble${showName && "__arrow"}__${order}`}
          variant="subtitle2"
          color="white"
        >
          {chatRes.message}
        </Typography>
        {showTime ? (
          <Typography variant="subtitle2" sx={{ whiteSpace: "nowrap" }} ml={1} mr={1}>
            {formatDate(chatRes.time, "A h:mm")}
          </Typography>
        ) : null}
      </Stack>
    </Stack>
  );
};
