import {
  AccordionSummary,
  Button,
  CardContent,
  List,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { FC, Suspense } from "react";
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

  const { chatBodyRef } = useScrollToBottomRef();

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
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography align="inherit">{title}</Typography>
      </AccordionSummary>

      <List className="chat__body" ref={chatBodyRef} sx={{ maxHeight: maxHeight }}>
        {chatList.map((it, idx) => (
          <ChatBlock
            key={idx}
            chatRes={it}
            order={it.name === "나" ? "right" : "left"}
            showName={idx === 0 || chatList[idx - 1].name !== it.name  || chatList[idx - 1].time !== it.time}
            showTime={idx === chatList.length - 1 || chatList[idx + 1].name !== it.name || chatList[idx + 1].time !== it.time}
          />
        ))}
      </List>

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
    </Accordion>
  );
};
