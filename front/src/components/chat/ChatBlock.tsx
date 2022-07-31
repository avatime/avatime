import { Box, Chip, Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import { ChatMessageRes } from "../../apis/response/chatRes";

type Order = "left" | "right";

interface IProps {
  chatMessageRes: ChatMessageRes;
  order: Order;
  showTime: boolean;
  showName: boolean;
  formatedTime: string;
}

export const ChatBlock: FC<IProps> = ({
  chatMessageRes,
  order,
  showTime,
  showName,
  formatedTime,
}) => {
  return (
    <Stack alignItems="stretch" pl={2} pr={2} p={0.5} pb={showTime ? 1 : 0} ml={1} mr={1}>
      {chatMessageRes.chat_type === "TALK" ? (
        <>
          {order === "left" && showName && (
            <Stack direction="row">
              <Typography variant="subtitle1">{chatMessageRes.name}</Typography>
            </Stack>
          )}
          <Stack direction={order === "left" ? "row" : "row-reverse"} alignItems="flex-end">
            <Typography
              className={`chat__bubble__${order} chat__bubble${showName && "__arrow"}__${order}`}
              variant="subtitle2"
              color="white"
            >
              {chatMessageRes.message}
            </Typography>
            {showTime && (
              <Typography variant="subtitle2" sx={{ whiteSpace: "nowrap" }} ml={1} mr={1}>
                {formatedTime}
              </Typography>
            )}
          </Stack>
        </>
      ) : (
        <Box display="flex" justifyContent="center" mt={1} mb={1}>
          <Chip label={chatMessageRes.message} />
        </Box>
      )}
    </Stack>
  );
};
