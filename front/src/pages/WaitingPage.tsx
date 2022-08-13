import React, { FC, useEffect, useMemo, useState } from "react";
import { ChatRoom } from "../components/chat/ChatRoom";
import {
  Badge,
  BadgeProps,
  Box,
  Grid,
  IconButton,
  styled,
  Typography,
  Stack,
  Snackbar,
  Slide,
  SlideProps,
  Alert,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import "../components/chat/style.css";
import Button from "@mui/material/Button";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { WaitingUser } from "../apis/response/waitingRoomRes";
import { ReceptionModal } from "../components/waitingRoom/ReceptionModal";
import { WaitingUserProfile } from "../components/waitingRoom/WaitingUserProfile";
import { UserInfoModal } from "../components/waitingRoom/UserInfoModal";
import { setMeetingRoomId } from "../stores/slices/meetingSlice";
import { setMaster } from "../stores/slices/waitingSlice";
import { useWebSocket } from "../hooks/useWebSocket";
import { AvatimeApi } from "../apis/avatimeApi";
import { AlertSnackbar } from "../components/AlertSnackbar";

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
  const headCount = useSelector((state: any) => state.waiting.headCount);
  const gender = useSelector((state: any) => state.user.userGender);

  const [waitingUserList, setWaitingUserList] = useState<WaitingUser[]>([]);
  const [candidateList, setCandidateList] = useState<WaitingUser[]>([]);
  const [isMaster, setIsMaster] = useState<boolean>();
  const [showSnack, setShowSnack] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useWebSocket({
    onConnect: (frame, client) => {
      client.subscribe(`/topic/waiting/info/${waitingState.roomId}`, (response) => {
        const res = JSON.parse(response.body);
        console.log(res);
        setWaitingUserList(res.user_list);
        const isMaster = res.user_list.find((it: any) => it.id === userId).type === 0;
        setIsMaster(isMaster);
        dispatch(setMaster(isMaster));

        if (res.status) {
          dispatch(setMeetingRoomId(res.meeting_room_id));
          navigate("/pickAvatar", { replace: true });
        }
      });
      client.publish({ destination: `/app/waiting/info/${waitingState.roomId}` });

      client.subscribe(`/topic/reception/${waitingState.roomId}`, (response) => {
        setCandidateList((prev) => {
          const res = JSON.parse(response.body);
          if (prev.length < res.length) {
            setShowSnack(true);
          }
          return res;
        });
      });
      client.publish({ destination: `/app/reception/${waitingState.roomId}` });
    },
    beforeDisconnected: function (frame, client): void {
      AvatimeApi.getInstance().requestEnterRoom(
        {
          room_id: waitingState?.roomId,
          user_id: userId,
          type: 5,
        },
        {
          navigate,
        }
      );
    },
  });

  const [openReception, setOpenReception] = useState(false);
  const onClickReception = () => {
    setOpenReception((prev) => !prev);
  };

  const [showConfirm, setShowConfirm] = useState(0);
  const [confirmMessage, setConfirmMessage] = useState("");

  const onClickStart = () => {
    setShowConfirm(1);
    setConfirmMessage("정말 시작하실 건가요?");
  };
  const start = () => {
    AvatimeApi.getInstance().startPickAvatar(
      {
        waiting_room_id: Number(waitingState.roomId),
      },
      {
        navigate,
      }
    );
  };

  const onClickExit = () => {
    setShowConfirm(2);
    setConfirmMessage("정말 나가실 건가요?");
  };
  const exit = () => {
    navigate("/main", { replace: true });
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

  const sameGenderUserList = useMemo(
    () => waitingUserList.filter((it) => it.gender === gender),
    [gender, waitingUserList]
  );

  const diffGenderUserList = useMemo(
    () => waitingUserList.filter((it) => it.gender !== gender),
    [gender, waitingUserList]
  );

  return (
    <div className="mainback" style={{ display: "flex", flexDirection: "column" }}>
      <Grid container spacing={3} p={2} sx={{ flex: "1" }}>
        <Grid item xs={9} sx={{ float: "left", display: "flex", flexDirection: "column" }}>
          <Box pl={1}>
            <Typography variant="h4">
              {waitingState.roomName} / {waitingState.sido} / {waitingState.age}
            </Typography>
          </Box>
          <Box
            display="flex"
            flex={1}
            flexDirection="column"
            alignItems="stretch"
            borderRadius="10px"
            bgcolor={grey[200]}
            p={2}
          >
            {[0, 1].map((outerIdx) => (
              <Grid
                key={outerIdx}
                container
                justifyContent="space-evenly"
                alignItems="center"
                spacing={2}
                flex={1}
              >
                {Array.from(Array(headCount / 2)).map((_, innerIdx) => {
                  const list = outerIdx === 0 ? sameGenderUserList : diffGenderUserList;
                  const it = innerIdx < list.length ? list[innerIdx] : null;
                  return (
                    <Grid key={innerIdx} item xs={3} height="80%">
                      <WaitingUserProfile
                        waitingUser={it}
                        onClickAvatar={onOpenInfo}
                        me={userId === it?.id}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            ))}
          </Box>
        </Grid>
        <Grid item xs={3} sx={{ float: "left", display: "flex", flexDirection: "column" }}>
          <Stack width="100%" direction="row-reverse">
            <IconButton onClick={onClickReception}>
              <StyledBadge color="primary" badgeContent={candidateList.length} overlap="circular">
                <PeopleAltIcon />
              </StyledBadge>
            </IconButton>
          </Stack>
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
            {isMaster && (
              <Grid item xs>
                <Button
                  variant="contained"
                  startIcon={<PlayCircleOutlineIcon />}
                  sx={{ width: "100%" }}
                  onClick={onClickStart}
                  color="secondary"
                  // disabled={waitingUserList.length !== waitingState.headCount}
                >
                  시작
                </Button>
              </Grid>
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
        isMaster={!!isMaster}
      />
      <UserInfoModal open={openInfo} onClose={onCloseInfo} userId={infoUserId} />
      <AlertSnackbar
        open={showSnack}
        onClose={() => setShowSnack(false)}
        message="누군가 참가 신청을 했어요!!"
        alertColor="info"
        type="alert"
      />
      <AlertSnackbar
        open={showConfirm !== 0}
        onClose={() => setShowConfirm(0)}
        message={confirmMessage}
        type="confirm"
        onSuccess={showConfirm === 1 ? start : exit}
        alertColor="warning"
      />
    </div>
  );
};
