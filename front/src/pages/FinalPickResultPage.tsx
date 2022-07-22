import React, { FC } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useSelector } from "react-redux";
import Xarrow, { Xwrapper } from "react-xarrows";
import { useQuery } from "react-query";
import sessionApi from "../apis/sessionApi";
import { PickResult } from "../apis/response/sessionRes";

interface IProps {}

export const FinalPickResultPage: FC<IProps> = (props) => {
  const userList = useSelector((state: any) => state.meeting.userList);

  const { data } = useQuery(
    "meeting/resultMeetingPick",
    () => sessionApi.getFinalPickResult(0, userList.length),
    {
      staleTime: Infinity,
    }
  );

  return <FinalPickResultPagePresenter userList={userList} resultList={data?.resultList} />;
};

interface IPresenterProps {
  userList: any[];
  resultList: PickResult[] | undefined;
}

const FinalPickResultPagePresenter: FC<IPresenterProps> = ({ userList, resultList }) => {
  const UserProfileList = (l: number, r: number) => (
    <Grid container item spacing={2} direction="column" xs={2}>
      {userList.slice(l, r).map((it) => (
        <Grid
          item
          xs
          key={it.userId}
          position="relative"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Box
            position="relative"
            sx={{
              height: "70%",
              aspectRatio: "auto 1 / 1",
              backgroundColor: "white",
              backgroundImage: `url(${it.avatarImagePath})`,
              backgroundSize: "cover",
              backgroundPosition: "center 50%",
              borderRadius: "100%",
              border: "2px solid black",
            }}
          >
            <Box
              id={"out" + it.userId}
              position="absolute"
              top="20%"
              right={l === 0 ? 0 : 100}
              left={l === 0 ? 100 : 0}
            />
            <Box
              id={"in" + it.userId}
              position="absolute"
              bottom="20%"
              right={l === 0 ? 0 : 100}
              left={l === 0 ? 100 : 0}
            />
          </Box>
          <Typography variant="subtitle1">{it.avatarName}</Typography>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Box height="100vh" display="flex" alignItems="stretch" justifyContent="stretch">
      <Grid
        container
        borderRadius="10px"
        m={3}
        p={2}
        bgcolor={grey[200]}
        direction="row"
        spacing={3}
      >
        {UserProfileList(0, userList.length / 2)}
        <Grid item xs />
        {UserProfileList(userList.length / 2, userList.length)}
        <Xwrapper>
          {resultList?.map((it) => (
            <Xarrow
              key={it.userId}
              start={"out" + it.userId}
              end={"in" + it.pickUserId}
              curveness={0}
              lineColor="red"
              headColor="red"
              animateDrawing={true}
            />
          ))}
        </Xwrapper>
      </Grid>
    </Box>
  );
};
