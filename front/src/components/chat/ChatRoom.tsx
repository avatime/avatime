import {
  AccordionSummary,
  Button,
  CardContent,
  List,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { FC, Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useQuery } from "react-query";
import chatApi from "../../apis/chatApi";
import { ChatRes } from "../../apis/response/chatRes";
import { ChatBlock } from "./ChatBlock";
import "./style.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import { styled } from "@mui/material/styles";
import useScrollToBottomRef from "../../hooks/useScrollToBottomRef";
import { grey } from "@mui/material/colors";
import SendIcon from "@mui/icons-material/Send";

type ChatType = "all" | "gender";

interface IProps {
  chatType: ChatType;
  isOpened: boolean;
  onClickHeader: () => void | null;
  maxHeight: string;
}

export const ChatRoom: FC<IProps> = ({ chatType, isOpened, onClickHeader, maxHeight }) => {
  const title = chatType === "all" ? "전체 채팅" : "성별 채팅";

  const { data } = useQuery<any, Array<ChatRes>>("session/allChat", () => chatApi.receive(), {
    suspense: true,
  });

  const chatBodyRef = useScrollToBottomRef();
  const chatInputRef = useScrollToBottomRef();

  const [inputMessage, setInputMessage] = useState("");

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

  const sendMessage = () => {
    if (!inputMessage) {
      return;
    }

    console.log("sendMessage!!");
    setInputMessage("");
  };

  return (
    <Suspense fallback={<h1>로딩중</h1>}>
      <ErrorBoundary fallback={<h1>에러에러</h1>}>
        <ChatRoomPresenter
          title={title}
          chatList={data}
          isOpened={isOpened}
          onClickHeader={onClickHeader}
          maxHeight={maxHeight}
          chatBodyRef={chatBodyRef}
          chatInputRef={chatInputRef}
          inputMessage={inputMessage}
          onChangeInputMessage={(s: string) => setInputMessage(s)}
          onKeyUp={onKeyUp}
          onKeyDown={onKeyDown}
          sendMessage={sendMessage}
        />
      </ErrorBoundary>
    </Suspense>
  );
};

interface IPresenterProps {
  title: string;
  chatList: Array<ChatRes>;
  isOpened: boolean;
  onClickHeader: () => void | null;
  maxHeight: string;
  chatBodyRef: any;
  chatInputRef: any;
  inputMessage: string;
  onChangeInputMessage: (s: string) => void;
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
  inputMessage,
  onChangeInputMessage,
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
            chatRes={it}
            order={it.name === "나" ? "right" : "left"}
            showName={
              idx === 0 || chatList[idx - 1].name !== it.name || chatList[idx - 1].time !== it.time
            }
            showTime={
              idx === chatList.length - 1 ||
              chatList[idx + 1].name !== it.name ||
              chatList[idx + 1].time !== it.time
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
            value={inputMessage}
            onChange={(e: any) => onChangeInputMessage(e.target.value)}
            onKeyUp={onKeyUp}
            onKeyDown={onKeyDown}
          />
          <Button variant="contained" onClick={sendMessage} disabled={!inputMessage}>
            <SendIcon />
          </Button>
        </Stack>
      </CardContent>
    </Accordion>
  );
};
