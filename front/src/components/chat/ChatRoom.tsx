import {
  AccordionSummary,
  Button,
  CardContent,
  List,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import chatApi from "../../apis/chatApi";
import { ChatMessageRes } from "../../apis/response/chatRes";
import { ChatBlock } from "./ChatBlock";
import "./style.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import { styled } from "@mui/material/styles";
import useScrollToBottomRef from "../../hooks/useScrollToBottomRef";
import { grey } from "@mui/material/colors";
import SendIcon from "@mui/icons-material/Send";
import SockJS from "sockjs-client";
import * as Stomp from "stompjs";

type ChatType = "all" | "gender";

interface IProps {
  chatType: ChatType;
  isOpened: boolean;
  onClickHeader: () => void | null;
  maxHeight: string;
  chattingRoomId: number;
}

export const ChatRoom: FC<IProps> = ({
  chatType,
  isOpened,
  onClickHeader,
  maxHeight,
  chattingRoomId,
}) => {
  const [stompClient, setStompClient] = useState<any>();
  const [chatList, setChatList] = useState<ChatMessageRes[]>([]);

  useEffect(() => {
    if (stompClient) {
      return;
    }
    const socket = new SockJS("http://localhost:8080/ws/ava");
    const client = Stomp.over(socket);
    client.connect({}, function (frame) {
      console.log("소켓 연결 성공", frame);

      client.subscribe(`/topic/chatting/receive/${chattingRoomId}`, (res) => {
        setChatList(JSON.parse(res.body));
      });
    });

    setStompClient(client);
  }, [chattingRoomId, stompClient]);

  const chatBodyRef = useScrollToBottomRef();
  const chatInputRef = useScrollToBottomRef();

  const onKeyUp = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      sendMessage();
    }
  };

  const onKeyDown = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
    }
  };

  const [message, setMessage] = useState("");
  const sendMessage = () => {
    if (!message) {
      return;
    }

    console.log("sendMessage!!");
    chatApi.sendMessage({
      chattingroom_id: 1,
      type: "TALK",
      user_id: 1,
      message,
    });
    setMessage("");
  };

  return (
    <ChatRoomPresenter
      title={chatType === "all" ? "전체 채팅" : "성별 채팅"}
      chatList={chatList}
      isOpened={isOpened}
      onClickHeader={onClickHeader}
      maxHeight={maxHeight}
      chatBodyRef={chatBodyRef}
      chatInputRef={chatInputRef}
      message={message}
      onChangeMessage={(s: string) => setMessage(s)}
      onKeyUp={onKeyUp}
      onKeyDown={onKeyDown}
      sendMessage={sendMessage}
    />
  );
};

interface IPresenterProps {
  title: string;
  chatList: Array<ChatMessageRes>;
  isOpened: boolean;
  onClickHeader: () => void | null;
  maxHeight: string;
  chatBodyRef: any;
  chatInputRef: any;
  message: string;
  onChangeMessage: (s: string) => void;
  onKeyUp: (e: any) => void;
  onKeyDown: (e: any) => void;
  sendMessage: () => void;
}

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const ChatRoomPresenter: FC<IPresenterProps> = ({
  title,
  chatList,
  isOpened,
  onClickHeader,
  maxHeight,
  chatBodyRef,
  chatInputRef,
  message,
  onChangeMessage,
  onKeyUp,
  onKeyDown,
  sendMessage,
}) => {
  return (
    <Accordion
      className="chat"
      expanded={isOpened}
      onChange={onClickHeader}
      sx={{
        flexGrow: isOpened ? 1 : 0,
        display: "flex",
        flexDirection: "column",
        maxHeight: maxHeight,
        borderRadius: "10px",
        bgcolor: grey[50],
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography align="inherit">{title}</Typography>
      </AccordionSummary>

      <List ref={chatBodyRef} sx={{ flexGrow: "1", bgcolor: grey[50], overflow: "auto" }}>
        {chatList.map((it, idx) => (
          <ChatBlock
            key={idx}
            chatMessageRes={it}
            order={it.name === "나" ? "right" : "left"}
            showName={
              idx === 0 ||
              chatList[idx - 1].name !== it.name ||
              chatList[idx - 1].created_time !== it.created_time
            }
            showTime={
              idx === chatList.length - 1 ||
              chatList[idx + 1].name !== it.name ||
              chatList[idx + 1].created_time !== it.created_time
            }
          />
        ))}
      </List>

      <CardContent
        sx={{ borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px", bgcolor: "#D9D9D9" }}
      >
        <Stack direction="row" spacing={1}>
          <TextField
            ref={chatInputRef}
            InputProps={{ className: "chat__input" }}
            inputProps={{ className: "chat__input__textarea" }}
            multiline
            fullWidth={true}
            rows={2}
            placeholder="여기 채팅 메시지를 입력하세요."
            value={message}
            onChange={(e: any) => onChangeMessage(e.target.value)}
            onKeyUp={onKeyUp}
            onKeyDown={onKeyDown}
          />
          <Button variant="contained" onClick={sendMessage} disabled={!message}>
            <SendIcon />
          </Button>
        </Stack>
      </CardContent>
    </Accordion>
  );
};
