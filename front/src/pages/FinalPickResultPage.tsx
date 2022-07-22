import React, { FC, useState } from "react";
import { Backdrop, Box, Button, Grid, Typography, useTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useSelector } from "react-redux";
import Xarrow, { Xwrapper } from "react-xarrows";
import { useQuery } from "react-query";
import sessionApi from "../apis/sessionApi";
import { FinalPickResultRes } from "../apis/response/sessionRes";
import useTimer from "../hooks/useTimer";
import { useEffect } from "react";
import { SessionModal } from "../components/session/modal/SessionModal";
import { useNavigate } from "react-router";

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

  const timer = useTimer(5, 1000);

  const [arrowOrderList, setArrowOrderList] = useState<number[]>([]);

  useEffect(() => {
    if (!data) {
      return;
    }

    let idx = 1;
    let cnt = 1;
    let prevUserIndex = 0;
    const temp = Array(userList.length).fill(-1);
    temp[0] = 0;

    while (cnt < userList.length) {
      const pickUserIndex = data.resultList.findIndex(
        // eslint-disable-next-line no-loop-func
        (it) => it.userId === data.resultList[prevUserIndex].pickUserId
      );
      if (temp[pickUserIndex] !== -1) {
        while (temp[idx] !== -1 && idx < userList.length) {
          idx++;
        }
        temp[idx++] = cnt++;
      } else {
        temp[pickUserIndex] = cnt++;
      }
      prevUserIndex = pickUserIndex;
    }
    setArrowOrderList(temp);
  }, [data, userList.length]);

  const navigate = useNavigate();
  const onModalClose = () => {
    if (data?.matched) {
      navigate("/session");
    } else {
      navigate("/");
    }
  };

  return (
    <FinalPickResultPagePresenter
      userList={userList}
      data={data}
      timer={timer}
      arrowOrderList={arrowOrderList}
      onModalClose={onModalClose}
    />
  );
};

interface IPresenterProps {
  userList: any[];
  data?: FinalPickResultRes;
  timer: number;
  arrowOrderList: number[];
  onModalClose: () => void;
}

const FinalPickResultPagePresenter: FC<IPresenterProps> = ({
  userList,
  data,
  timer,
  arrowOrderList,
  onModalClose,
}) => {
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
              id={(l === 0 ? "in" : "out") + it.userId}
              position="absolute"
              top="20%"
              right={l === 0 ? 0 : 100}
              left={l === 0 ? 100 : 0}
            />
            <Box
              id={(l === 0 ? "out" : "in") + it.userId}
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

  const theme = useTheme();

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
          {data?.resultList?.map(
            (it, idx) =>
              arrowOrderList[idx] <= -timer && (
                <Xarrow
                  key={it.userId}
                  start={"out" + it.userId}
                  end={"in" + it.pickUserId}
                  curveness={0}
                  lineColor={
                    userList.length <= -timer &&
                    it.userId ===
                      data?.resultList?.find((i) => i.userId === it.pickUserId)?.pickUserId
                      ? "red"
                      : theme.palette.primary.main
                  }
                  headColor={
                    userList.length <= -timer &&
                    it.userId ===
                      data?.resultList?.find((i) => i.userId === it.pickUserId)?.pickUserId
                      ? "red"
                      : theme.palette.primary.main
                  }
                  animateDrawing={0.5}
                />
              )
          )}
        </Xwrapper>
      </Grid>
      <Backdrop open={0 < timer}>
        <Typography variant="h1" color="white">
          {timer}
        </Typography>
      </Backdrop>
      <SessionModal
        open={timer <= -userList.length - 1}
        justifyContent="center"
        onClose={onModalClose}
      >
        <Typography variant="h3">
          {data?.matched ? "잠시 후에 둘만의 시간을 갖게돼요 >.<" : "힝 다음 인연을 찾아보세요!"}
        </Typography>
      </SessionModal>
    </Box>
  );
};
