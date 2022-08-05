import React, { FC, useEffect, useState } from "react";
import { ChatRoom } from "../components/chat/ChatRoom";
import { Badge, BadgeProps, Box, Grid, IconButton, styled, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { MainHeader } from "../components/main/MainHeader";
import "../components/chat/style.css";
import Button from "@mui/material/Button";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router";
import SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import { WaitingUser } from "../apis/response/waitingRoomRes";
import { ReceptionModal } from "../components/waitingRoom/ReceptionModal";
import { WaitingUserProfile } from "../components/waitingRoom/WaitingUserProfile";
import { UserInfoModal } from "../components/waitingRoom/UserInfoModal";
import { requestEnterRoomApi, waitingApi } from "../apis/waitingRoomApi";
import { WS_BASE_URL } from "../apis/axiosInstance";
import { setMeetingRoomId } from "../stores/slices/meetingSlice";

interface IProps {}

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export const WaitingPage: FC<IProps> = (props) => {
  const waitingState = useSelector((state: any) => state.waiting);
  const userId = useSelector((state: any) => state.user.userId);

  const [waitingUserList, setWaitingUserList] = useState<WaitingUser[]>([]);

  const [candidateList, setCandidateList] = useState<WaitingUser[]>([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!waitingState?.roomId) {
      return;
    }

    const socket = new SockJS(WS_BASE_URL);
    const client = Stomp.over(socket);
    client.connect({}, () => {
      client.subscribe(`/topic/waiting/info/${waitingState.roomId}`, (response) => {
        const res = JSON.parse(response.body);
        console.log(res);
        setWaitingUserList(res.user_list);
        if (res.status) {
          dispatch(setMeetingRoomId(res.meeting_room_id));
          navigate("/pickAvatar");
        }
      });
      client.send(`/app/waiting/info/${waitingState.roomId}`);

      if (!waitingState.isMaster) {
        return;
      }

      client.subscribe(`/topic/reception/${waitingState.roomId}`, (response) => {
        setCandidateList(JSON.parse(response.body));
      });
      client.send(`/app/reception/${waitingState.roomId}`);
    });

    return () => {
      client.disconnect(() => {
        requestEnterRoomApi.requestEnterRoom({
          room_id: waitingState?.roomId,
          user_id: userId,
          type: 5,
        });
      });
    };
  }, [dispatch, navigate, userId, waitingState]);

  const [openReception, setOpenReception] = useState(false);
  const onClickReception = () => {
    setOpenReception((prev) => !prev);
  };

  const onClickStart = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("정말 시작할건가요?")) {
       waitingApi.startPickAvatar({
        waiting_room_id: Number(waitingState.roomId),
      });
    }
  };
  const onClickExit = async () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("정말 나가실건가요?")) {
      navigate("/main");
    }
  };

  const [openInfo, setOpenInfo] = useState<boolean>(false);
  const [infoUserId, setInfoUserId] = useState<number>(-1);
  const onOpenInfo = (userId: number) => {
    setOpenInfo(true);
    setInfoUserId(userId);
  };
  const onCloseInfo = () => {
    setOpenInfo(false);
  };

  const chatRoomId = useSelector((state: any) => state.waiting.chatRoomId);

  return (
    <div className="mainback" style={{ display: "flex", flexDirection: "column" }}>
      <MainHeader hideSettings={true} />
      <Grid container spacing={3} p={2} sx={{ flex: "1" }}>
        <Grid item xs={9} sx={{ float: "left", display: "flex", flexDirection: "column" }}>
          <Box pl={1}>
            <Typography>
              {waitingState.roomName} / {waitingState.sido} / {waitingState.age}
            </Typography>
          </Box>
          <Box flex={1} borderRadius="10px" bgcolor={grey[200]} p={2}>
            <Grid container spacing={2} height="100%">
              {waitingUserList.map((it) => (
                <Grid item xs={12 / (waitingState.headCount / 2)} key={it.id} height="50%">
                  <WaitingUserProfile
                    waitingUser={it}
                    onClickAvatar={onOpenInfo}
                    me={userId === it.id}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={3} sx={{ float: "left", display: "flex", flexDirection: "column" }}>
          <Box flex={1}>
            <ChatRoom
              chatType="all"
              isOpened={true}
              maxHeight="100%"
              chattingRoomId={chatRoomId}
              foldable={false}
            />
          </Box>
          <Box p={1} />
          <Grid container spacing={2} alignItems="end">
            {waitingState.isMaster && (
              <>
                <Grid item xs={1} mr={1}>
                  <IconButton onClick={onClickReception}>
                    <StyledBadge
                      color="primary"
                      badgeContent={candidateList.length}
                      overlap="circular"
                    >
                      <PeopleAltIcon />
                    </StyledBadge>
                  </IconButton>
                </Grid>
                <Grid item xs>
                  <Button
                    variant="contained"
                    startIcon={<PlayCircleOutlineIcon />}
                    sx={{ width: "100%" }}
                    onClick={onClickStart}
                    // disabled={waitingUserList.length !== waitingState.headCount}
                  >
                    시작
                  </Button>
                </Grid>
              </>
            )}
            <Grid item xs>
              <Button
                variant="contained"
                color="error"
                startIcon={<ExitToAppIcon />}
                sx={{ width: "100%" }}
                onClick={onClickExit}
              >
                나가기
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <ReceptionModal
        open={openReception}
        onClickClose={onClickReception}
        candidateList={candidateList}
      />
      <UserInfoModal open={openInfo} onClose={onCloseInfo} userId={infoUserId} />
    </div>
  );
};
