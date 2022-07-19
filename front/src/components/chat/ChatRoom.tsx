import { Button, Card, CardContent, Stack, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { FC } from "react";
import { ChatRes } from "../../apis/response/chatRes";
import { ChatBlock } from "./ChatBlock";
import "./style.css";

type ChatType = "all" | "gender";
type Size = "full" | "half";

interface IProps {
  openable: boolean;
  size: Size;
  chatType: ChatType;
  chatList: Array<ChatRes>;
}

export const ChatRoom: FC<IProps> = ({ openable, size, chatType, chatList }) => {
  const chatBodyHeight = size === "full" ? "90vh" : "30vh";
  const title = chatType === "all" ? "전체 채팅" : "성별 채팅";
  return (
    <Card>
      <CardContent className="chat__header">
        <Typography variant="h6">{title}</Typography>
      </CardContent>
      <CardContent className="chat__body" sx={{ height: chatBodyHeight }}>
        {chatList.map((it, idx) => (
          <ChatBlock key={idx} chatRes={it} />
        ))}
      </CardContent>
      <CardContent className="chat__footer">
        <Stack direction="row" spacing={1}>
          <TextField
            InputProps={{ className: "chat__input" }}
            inputProps={{ className: "chat__input__textarea" }}
            multiline
            fullWidth={true}
            rows={2}
            placeholder="여기 채팅 메시지를 입력하세요."
          />
          <Button variant="contained">전송</Button>
        </Stack>
      </CardContent>
    </Card>
  );
};
