import { Box, Grid, Stack, Typography, useTheme } from "@mui/material";
import React, { FC, useEffect, useState, useCallback } from "react";
import { Timer } from "../../timer/Timer";
import { SessionModal } from "./SessionModal";
import { useWebSocket } from "../../../hooks/useWebSocket";
import { useSelector } from "react-redux";
import { AvatarProfile } from "./AvatarProfile";
import { StuffRes } from "../../../apis/response/sessionRes";
import { AvatimeApi } from "../../../apis/avatimeApi";
import { useNavigate } from "react-router";
import { SoundButton } from "../../SoundButton";

interface IProps {
  isOpened: boolean;
}

export const PickStuffModal: FC<IProps> = ({ isOpened }) => {
  const theme = useTheme();
  const meetingRoomId = useSelector((state: any) => state.meeting.roomId);
  const userId = useSelector((state: any) => state.user.userId);
  const gender = useSelector((state: any) => state.user.userGender);
  const [timer, setTimer] = useState(15);
  const [stuffList, setStuffList] = useState<StuffRes[]>([]);
  const [selectedStuffId, setSelectedStuffId] = useState(-1);

  useWebSocket({
    onConnect(frame, client) {
      client.subscribe(`/topic/meeting/stuff/timer/${meetingRoomId}`, function (response) {
        setTimer(JSON.parse(response.body));
      });
      client.publish({ destination: `/app/meeting/stuff/timer/${meetingRoomId}` });

      client.subscribe(`/topic/meeting/pick/${meetingRoomId}`, function (response) {
        const res = JSON.parse(response.body);

        if (selectedStuffId === -1) {
          setSelectedStuffId(res.stuff_list[0].id);
        }

        setStuffList(res.stuff_list);
      });
    },
    beforeDisconnected(frame, client) {},
  });

  const onClickStuff = (id: number) => {
    setSelectedStuffId(id);
  };

  const navigate = useNavigate();
  const onSelectStuff = useCallback(() => {
    AvatimeApi.getInstance().patchPickStuff(
      {
        meetingroom_id: meetingRoomId,
        user_id: userId,
        stuff_id: selectedStuffId,
      },
      {
        onSuccess() {},
        navigate,
      }
    );
  }, [meetingRoomId, navigate, selectedStuffId, userId]);

  useEffect(() => {
    if (timer === 0) {
      onSelectStuff();
    }
  }, [onSelectStuff, timer]);

  return (
    <SessionModal open={isOpened} justifyContent="stretch">
      <>
        <Stack width="100%" direction="row" justifyContent="center" alignItems="center">
          <Typography variant="h4" alignSelf="center" ml="auto">
            마음에 드는 물건을 골라주세요 !!
          </Typography>
          <Box ml="auto">
            <Timer duration={15} remainingTime={timer} />
          </Box>
        </Stack>
        <Box p={1} />
        <Box width="100%" height="1px" bgcolor={theme.palette.divider} />
        <Box p={2} />
        <Grid container width="100%" height="100%" spacing={3}>
          {stuffList.map((it, idx) => (
            <Grid item key={idx} xs>
              <AvatarProfile
                selected={selectedStuffId === it.id}
                onClick={() => onClickStuff(it.id)}
                avatarName={it.name}
                avatarImagePath={it.image_path}
                canSelect={gender === "M" ? !it.men_selected : !it.women_selected}
              />
            </Grid>
          ))}
        </Grid>
        <SoundButton
          onClick={() => onSelectStuff()}
          fullWidth
          variant="contained"
          color="secondary"
        >
          선택하기
        </SoundButton>
      </>
    </SessionModal>
  );
};
