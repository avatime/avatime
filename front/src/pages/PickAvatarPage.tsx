import React, { FC, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { MainHeader } from "../components/main/MainHeader";
import { Box } from "@mui/system";
import grey from "@mui/material/colors/grey";
import { GaugeBar } from "../components/pickAvatar/GaugeBar";
import { AvatarPickInfoRes } from "../apis/response/avatarRes";
import { Avatar } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { AvatarProfile } from "../components/session/modal/AvatarProfile";
import { useNavigate } from "react-router";
import { useWebSocket } from "../hooks/useWebSocket";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import { AvatimeApi } from "../apis/avatimeApi";
import { useBGM } from "../hooks/useBGM";
import { AlertSnackbar } from "../components/AlertSnackbar";

interface IProps {}

export const PickAvatarPage: FC<IProps> = () => {
  const [selected, setSelected] = useState(false);
  const handleChangeSelect = () => {
    if (avatarId === 0) {
      return;
    }
    setSelected((prev: any) => (prev ? prev : !prev));

    if (!selected) {
      finishSelectingAvatar();
    }
  };
  const navigate = useNavigate();

  //소켓 통신-----------------------------------------------------------------
  const [originData, setOriginData] = useState<AvatarPickInfoRes>();
  const [timer, setTimer] = useState(30);

  const meetingRoomId = useSelector((state: any) => state.meeting.roomId);
  const userId = useSelector((state: any) => state.user.userId);
  const [showalertAvatar, setShowalertAvatar] = useState(false);

  useWebSocket({
    onConnect: (frame, client) => {
      //아바타 목록
      client.subscribe(`/topic/meeting/avatar/${meetingRoomId}`, function (response) {
        console.log(response.body);
        const res = JSON.parse(response.body);
        setOriginData(res);
        if (res.status === 1) {
          navigate("/session", { replace: true });
        }
      });

      //타이머 구독
      client.subscribe(`/topic/meeting/avatar/timer/${meetingRoomId}`, function (response) {
        console.log("타이머" + response.body);
        setTimer(JSON.parse(response.body));
      });

      client.publish({ destination: `/app/meeting/avatar/${meetingRoomId}` });
      client.publish({ destination: `/app/meeting/avatar/timer/${meetingRoomId}` });
    },
    beforeDisconnected: (frame, client) => {},
  });

  //아바타 선택
  const [avatarId, setAvatarId] = useState(0);
  const selectAvatar = (avaId: number) => {
    if (!selected) {
      setAvatarId(avaId);
    }
    console.log("아바타선택함수" + avaId);
  };

  //언니한테 아바타 뭘 선택했는지 알려줘
  const finishSelectingAvatar = () => {
    if (avatarId === 0) {
      return;
    }

    AvatimeApi.getInstance().pickAvatar(
      {
        meetingroom_id: meetingRoomId,
        user_id: userId,
        avatar_id: avatarId,
      },

      {
        onFailure(error) {
          setShowalertAvatar(true);
        },
        navigate,
      }
    );
  };

  useBGM("select");

  //----------------------------------------------------------------------------------
  //꼭 다시 봐
  return (
    <div className="mainback" style={{ display: "flex", flexDirection: "column" }}>
      <Box flex={1} borderRadius="10px" bgcolor={grey[200]} m={2} p={2}>
        <Grid container spacing={2} direction="column" sx={{ height: "100%" }}>
          {Array.from(Array(3)).map((_, index) => (
            <Grid container item xs spacing={2}>
              {Array.from(Array(8)).map((_, idx) => {
                const i = index * 8 + idx;
                if (!originData || i > originData.avatar_list.length - 1) {
                  return null;
                } else {
                  if (!originData.avatar_list[i].selected) {
                    return (
                      <Grid item xs={12 / 8}>
                        <AvatarProfile
                          selected={avatarId === originData.avatar_list[i].id}
                          onClick={() => selectAvatar(originData.avatar_list[i].id)}
                          avatarName={originData.avatar_list[i].name}
                          avatarImagePath={originData.avatar_list[i].image_path}
                        />
                      </Grid>
                    );
                  } else {
                    return (
                      <Grid item xs={12 / 8} position="relative">
                        <AvatarProfile
                          selected={avatarId === originData.avatar_list[i].id}
                          onClick={() => {}}
                          avatarName={originData.avatar_list[i].name}
                          avatarImagePath={originData.avatar_list[i].image_path}
                          canSelect={false}
                        />
                        {avatarId !== originData.avatar_list[i].id && (
                          <Box
                            position="absolute"
                            left="16px"
                            right="0"
                            top="0"
                            bottom="32px"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <DoDisturbIcon
                              fontSize="inherit"
                              color="error"
                              sx={{ fontSize: "10vw" }}
                            />
                          </Box>
                        )}
                      </Grid>
                    );
                  }
                }
              })}
            </Grid>
          ))}
        </Grid>
      </Box>
      <GaugeBar
        total={30}
        current={timer}
        finishSelectingAvatar={finishSelectingAvatar}
        selected={selected}
        handleChangeSelect={handleChangeSelect}
      />
      <AlertSnackbar
        open={showalertAvatar}
        onClose={() => setShowalertAvatar(false)}
        message="로그인 성공"
        alertColor="warning"
        type="alert"
      />
    </div>
  );
};
