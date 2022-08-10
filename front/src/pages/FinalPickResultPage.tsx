import React, { FC, useMemo, useState } from "react";
import { Backdrop, Box, Button, Grid, Typography, useTheme, CircularProgress } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useSelector, useDispatch } from "react-redux";
import Xarrow, { Xwrapper } from "react-xarrows";
import { useQuery } from "react-query";
import sessionApi from "../apis/sessionApi";
import { FinalPickResultRes } from "../apis/response/sessionRes";
import useTimer from "../hooks/useTimer";
import { useEffect } from "react";
import { SessionModal } from "../components/session/modal/SessionModal";
import { useNavigate } from "react-router";
import { setSubMeetingRoomId } from "../stores/slices/meetingSlice";

interface IProps {}

export const FinalPickResultPage: FC<IProps> = (props) => {
  const roomId = useSelector((state: any) => state.meeting.roomId);
  const gender = useSelector((state: any) => state.user.userGender);
  const userId = useSelector((state: any) => state.user.userId);
  const [pickResult, setPickResult] = useState<FinalPickResultRes>();

  useEffect(() => {
    if (!roomId || !gender || !userId) {
      return;
    }

    sessionApi
      .getFinalPickResult({
        meetingroom_id: roomId,
        user_id: userId,
      })
      .then((it) => {
        it.result_list.sort((a, _) => (a.gender === gender ? -1 : 1));
        setPickResult(it);
      });
  }, [gender, roomId, userId]);

  const timer = useTimer(5, 1000);
  const [arrowOrderList, setArrowOrderList] = useState<number[]>([]);

  useEffect(() => {
    if (!pickResult) {
      return;
    }

    let idx = 1;
    let cnt = 1;
    let prevUserIndex = 0;
    const temp = Array(pickResult.result_list.length).fill(-1);
    temp[0] = 0;

    while (cnt < pickResult.result_list.length) {
      const pickUserIndex = pickResult.result_list.findIndex(
        // eslint-disable-next-line no-loop-func
        (it) => it.id === pickResult.result_list[prevUserIndex].pick_user_id
      );
      if (temp[pickUserIndex] !== -1) {
        while (temp[idx] !== -1 && idx < pickResult.result_list.length) {
          idx++;
        }
        temp[idx] = cnt++;
        prevUserIndex = idx++;
      } else {
        temp[pickUserIndex] = cnt++;
        prevUserIndex = pickUserIndex;
      }
    }
    setArrowOrderList(temp);
  }, [pickResult]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onModalClose = () => {
    if (pickResult?.matched) {
      dispatch(setSubMeetingRoomId(pickResult.meetingroom_id));
      navigate("/subSession");
    } else {
      navigate("/main");
    }
  };

  if (!pickResult) {
    return <CircularProgress />;
  }

  return (
    <FinalPickResultPagePresenter
      pickResult={pickResult}
      timer={timer}
      arrowOrderList={arrowOrderList}
      onModalClose={onModalClose}
    />
  );
};

interface IPresenterProps {
  pickResult: FinalPickResultRes;
  timer: number;
  arrowOrderList: number[];
  onModalClose: () => void;
}

const FinalPickResultPagePresenter: FC<IPresenterProps> = ({
  pickResult,
  timer,
  arrowOrderList,
  onModalClose,
}) => {
  const theme = useTheme();

  const UserProfileList = (l: number, r: number) => (
    <Grid container item spacing={2} direction="column" xs={2} justifyContent="center">
      {pickResult.result_list.slice(l, r).map((it) => (
        <Grid
          item
          xs={3}
          key={it.avatar_id}
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
              backgroundImage: `url(${it.avatar_image_path})`,
              backgroundSize: "cover",
              backgroundPosition: "center 50%",
              borderRadius: "100%",
              border: `3px solid ${it.gender === "M" ? theme.palette.primary.light : theme.palette.error.light}`,
            }}
          >
            <Box
              id={(l === 0 ? "in" : "out") + it.id}
              position="absolute"
              top="20%"
              right={l === 0 ? 0 : 100}
              left={l === 0 ? 100 : 0}
            />
            <Box
              id={(l === 0 ? "out" : "in") + it.id}
              position="absolute"
              bottom="20%"
              right={l === 0 ? 0 : 100}
              left={l === 0 ? 100 : 0}
            />
          </Box>
          <Typography variant="subtitle1">{it.avatar_name}</Typography>
        </Grid>
      ))}
    </Grid>
  );

  const headCount = pickResult.result_list.length;

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
        {UserProfileList(0, headCount / 2)}
        <Grid item xs />
        {UserProfileList(headCount / 2, headCount)}
        <Xwrapper>
          {pickResult.result_list.map((it, idx) => {
            const color =
              headCount <= -timer &&
              it.id === pickResult.result_list?.find((i) => i.id === it.pick_user_id)?.pick_user_id
                ? "red"
                : theme.palette.primary.main;
            return (
              arrowOrderList[idx] <= -timer && (
                <Xarrow
                  key={it.id}
                  start={"out" + it.id}
                  end={"in" + it.pick_user_id}
                  curveness={0}
                  lineColor={color}
                  headColor={color}
                  animateDrawing={0.5}
                />
              )
            );
          })}
        </Xwrapper>
      </Grid>
      <Backdrop open={0 < timer}>
        <Typography variant="h1" color="white">
          {timer}
        </Typography>
      </Backdrop>
      <SessionModal open={timer <= -headCount - 1} justifyContent="center" onClose={onModalClose}>
        <Typography variant="h3">
          {pickResult.matched
            ? "잠시 후에 둘만의 시간을 갖게돼요 >.<"
            : "힝 다음 인연을 찾아보세요!"}
        </Typography>
      </SessionModal>
    </Box>
  );
};
