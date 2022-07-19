import React, { FC, Suspense, useState } from "react";
import { useQuery } from "react-query";
import { Conference } from "../components/session/Conference";
import sessionApi from "../apis/sessionApi";
import { SessionUserListRes } from "../apis/response/sessionRes";
import { ChatRoom } from "../components/chat/ChatRoom";
import { Box, Grid } from "@mui/material";
import { ErrorBoundary } from "react-error-boundary";

interface IProps {}

export const SessionPage: FC<IProps> = (props) => {
  const { data: userListRes } = useQuery<any, SessionUserListRes>(
    "session/getUserList",
    () => sessionApi.requestSessionUserList(8),
    { suspense: true }
  );

  const [opened, setOpened] = useState<boolean[]>([true, true]);
  const cntOpened = opened.filter((it) => it).length;

  const fullHeight = "77vh";
  const halfHeight = "32vh";

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
        <Box height="100vh" display="flex" flexDirection="column" sx={{ overflow: "hidden" }}>
          <ChatRoom
            chatType="all"
            isOpened={opened[0]}
            onClickHeader={() => {
              setOpened((prev) => [!prev[0], prev[1]]);
            }}
            maxHeight={opened[0] && cntOpened === 1 ? fullHeight : halfHeight}
          />
          <ChatRoom
            chatType="gender"
            isOpened={opened[1]}
            onClickHeader={() => {
              setOpened((prev) => [prev[0], !prev[1]]);
            }}
            maxHeight={opened[1] && cntOpened === 1 ? fullHeight : halfHeight}
          />
        </Box>
      </Grid>
    </Grid>
  );
};
