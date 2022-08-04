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
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import { WaitingUser } from "../apis/response/waitingRoomRes";
import { ReceptionModal } from "../components/waitingRoom/ReceptionModal";
import { WaitingUserProfile } from "../components/waitingRoom/WaitingUserProfile";
import { UserInfoModal } from "../components/waitingRoom/UserInfoModal";

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

  const [waitingUserList, setWaitingUserList] = useState<WaitingUser[]>([
    {
      id: 1,
      type: 0,
      name: "name",
      gender: "F",
      profile_img_path:
        "https://w.namu.la/s/0c6301df01fc4f180ec65717bad3d0254258abf0be33299e55df7c261040f517518eb9008a1a2cd3d7b8b7777d70182c185bc891b1054dc57b11cc46fd29130a2a753ecb9c9d97808c741bf78325ddde5e063378f4c14bc13901c722f2a02ba5",
    },
    { id: 2, type: 1, name: "name", gender: "F", profile_img_path: "string;" },
    { id: 3, type: 1, name: "name", gender: "M", profile_img_path: "string;" },
    { id: 4, type: 1, name: "name", gender: "M", profile_img_path: "string;" },
    { id: 5, type: 1, name: "name", gender: "M", profile_img_path: "string;" },
    { id: 6, type: 1, name: "name", gender: "M", profile_img_path: "string;" },
    { id: 7, type: 1, name: "name", gender: "F", profile_img_path: "string;" },
    { id: 8, type: 1, name: "name", gender: "F", profile_img_path: "string;" },
  ]);

  const [candidateList, setCandidateList] = useState<WaitingUser[]>([
    { id: 1, type: 1, name: "name", gender: "F", profile_img_path: "string;" },
    { id: 2, type: 1, name: "name", gender: "F", profile_img_path: "string;" },
    { id: 3, type: 1, name: "name", gender: "F", profile_img_path: "string;" },
    { id: 4, type: 1, name: "name", gender: "F", profile_img_path: "string;" },
  ]);

  useEffect(() => {
    if (waitingState?.roomId) {
      return;
    }

    const socket = new SockJS("http://localhost:8080/ws/ava");
    const client = Stomp.over(socket);
    client.connect({}, () => {
      client.subscribe(`/topic/waiting/info/${waitingState.roomId}`, (res) => {
        console.log(res);
        setWaitingUserList(JSON.parse(res.body));
      });
      client.send("/app/waiting/info");

      if (!waitingState.isMaster) {
        return;
      }

      client.subscribe(`/topic/waitingUser/${waitingState.roomId}`, (res) => {
        console.log(res);
        setCandidateList(JSON.parse(res.body));
      });
    });

    return () => {
      client.disconnect(() => {});
    };
  }, [waitingState]);

  const [openReception, setOpenReception] = useState(false);
  const onClickReception = () => {
    setOpenReception((prev) => !prev);
  };

  const navigate = useNavigate();
  const onClickExit = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("정말 나가시겠습니까?")) {
      navigate("/");
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

  return (
    <div className="mainback" style={{ display: "flex", flexDirection: "column" }}>
      <MainHeader hideSettings={true} />
      <Grid container spacing={3} p={2} sx={{ flex: "1" }}>
        <Grid item xs={9} sx={{ float: "left", display: "flex", flexDirection: "column" }}>
          <Box pl={1}>
            <Typography>
              {waitingState.roomName} / {waitingState.region} / {waitingState.age}
            </Typography>
          </Box>
          <Box flex={1} borderRadius="10px" bgcolor={grey[200]} p={2}>
            <Grid container spacing={2} height="100%">
              {waitingUserList.map((it) => (
                <Grid item xs={12 / (waitingState.headCount / 2)} key={it.id} height="50%">
                  <WaitingUserProfile
                    waitingUser={it}
                    onClickAvatar={onOpenInfo}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={3} sx={{ float: "left", display: "flex", flexDirection: "column" }}>
          <Box display="flex" flexDirection="column" flex={1}>
            <ChatRoom
              chatType="all"
              isOpened={true}
              maxHeight="100%"
              chattingRoomId={1}
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
