import React, { FC, Suspense } from "react";
import { useQuery } from "react-query";
import { Conference } from "../components/session/Conference";
import sessionApi from "../apis/sessionApi";
import { SessionUserListRes } from "../apis/response/sessionRes";
import { ChatRoom } from "../components/chat/ChatRoom";
import { Grid } from "@mui/material";
import chatApi from "../apis/chatApi";
import { ErrorBoundary } from "react-error-boundary";
import { ChatRes } from "../apis/response/chatRes";

interface IProps {}

export const SessionPage: FC<IProps> = (props) => {
  const { data: userListRes } = useQuery<any, SessionUserListRes>(
    "session/getUserList",
    () => sessionApi.requestSessionUserList(8),
    { suspense: true }
  );

  const { data: chatData } = useQuery<any, Array<ChatRes>>(
    "session/allChat",
    () => chatApi.receive(),
    {
      suspense: true,
    }
  );

  return (
    <Grid container spacing={3} sx={{ float: "left" }}>
      <Grid item xs={9}>
        <Suspense fallback={<h1>로딩중</h1>}>
          <ErrorBoundary fallback={<h1>에러에러</h1>}>
            <Conference userList={userListRes.userList} />
          </ErrorBoundary>
        </Suspense>
      </Grid>
      <Grid item xs={3}>
        <Suspense fallback={<h1>로딩중</h1>}>
          <ErrorBoundary fallback={<h1>에러에러</h1>}>
            <ChatRoom openable={true} chatType="all" chatList={chatData} size="half" />
          </ErrorBoundary>
        </Suspense>
      </Grid>
    </Grid>
  );
};
