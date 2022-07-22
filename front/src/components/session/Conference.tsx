import React, { FC, Suspense } from "react";
import { VideoProfile } from "./VideoProfile";
import { Grid, Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import { SessionUser } from "../../apis/response/sessionRes";
import { useQuery } from "react-query";
import sessionApi from "../../apis/sessionApi";
import { SessionUserListRes } from "../../apis/response/sessionRes";
import { ErrorBoundary } from "react-error-boundary";

interface IProps {}

export const Conference: FC<IProps> = (props) => {
  const {
    data: { userList },
  } = useQuery<any, SessionUserListRes>(
    "session/getUserList",
    () => sessionApi.requestSessionUserList(8),
    { suspense: true }
  );

  return (
    <Suspense fallback={<h1>로딩중</h1>}>
      <ErrorBoundary fallback={<h1>에러에러</h1>}>
        <ConferencePresenter userList={userList} />
      </ErrorBoundary>
    </Suspense>
  );
};

interface IPresenterProps {
  userList: Array<SessionUser>;
}

const ConferencePresenter: FC<IPresenterProps> = ({ userList }) => {
  const cntUser = userList.length;

  return (
    <Box borderRadius="10px" flex={1} position="relative" bgcolor={grey[200]}>
      {cntUser === 2 ? (
        <>
          <Box height="95%" p={2}>
            <VideoProfile sessionUser={userList[1]} />
          </Box>
          <Box width="30%" height="30%" p={2} position="absolute" bottom="0" right="0">
            <VideoProfile sessionUser={userList[0]} />
          </Box>
        </>
      ) : (
        <Box height="100%" display="flex" flexDirection="column" p={2}>
          {[0, 1].map((it) => (
            <Box flex={1}>
              <Grid container height="95%" spacing={2} alignItems="stretch">
                {userList.slice((it * cntUser) / 2, ((it + 1) * cntUser) / 2).map((it, idx) => (
                  <Grid item xs={24 / cntUser} key={idx}>
                    <VideoProfile sessionUser={it} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};
