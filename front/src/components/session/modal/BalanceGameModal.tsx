import { Box, ButtonBase, Divider, Grid, Stack, styled, Typography, useTheme } from "@mui/material";
import React, { FC, useState, useEffect } from "react";
import { SessionModal } from "./SessionModal";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AvatimeApi } from "../../../apis/avatimeApi";
import { useWebSocket } from "../../../hooks/useWebSocket";
import { useSound } from "../../../hooks/useSound";
import { Timer } from "../../timer/Timer";

const Button = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  height: "100%",
  [theme.breakpoints.down("sm")]: {
    width: "100% !important", // Overrides inline-style
    height: "100%",
  },
  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
    "& .MuiImageBackdrop-root": {
      opacity: 0.15,
    },
    "& .MuiImageMarked-root": {
      opacity: 0,
    },
  },
}));

interface IProps {
  isOpened: boolean;
  onClose: () => void;
}

export const BalanceGameModal: FC<IProps> = ({ isOpened, onClose }) => {
  const navigate = useNavigate();

  const meetingRoomId = useSelector((state: any) => state.meeting.roomId);
  const userId = useSelector((state: any) => state.user.userId);

  const balanceId = useSelector((state: any) => state.meeting.balanceId);
  const balanceA = useSelector((state: any) => state.meeting.balanceA);
  const balanceB = useSelector((state: any) => state.meeting.balanceB);

  const [selected, setSelected] = useState(0);

  const theme = useTheme();
  const colors = [theme.palette.error.main, theme.palette.info.main];

  const onClick = (idx: number) => {
    setSelected(idx);
  };

  const [timer, setTimer] = useState<number>(15);
  useWebSocket({
    onConnect: (frame, client) => {
      client.subscribe(`/topic/meeting/balance/timer/${meetingRoomId}`, function (response) {
        setTimer(JSON.parse(response.body));
      });
      client.publish({ destination: `/app/meeting/balance/timer/${meetingRoomId}` });
    },
    beforeDisconnected: (frame, client) => {},
  });

  useEffect(() => {
    if (timer) {
      return;
    }

    AvatimeApi.getInstance().postResultBalanceGame(
      {
        meetingroom_id: meetingRoomId,
        balance_id: balanceId,
        user_id: userId,
        result: selected === 0,
      },
      {
        onSuccess(data) {
          onClose();
        },
        navigate,
      }
    );
  }, [balanceId, meetingRoomId, navigate, onClose, selected, timer, userId]);

  return (
    <SessionModal open={isOpened} justifyContent={"center"} width="40%">
      <>
        <Box  ml="auto">
          <Timer duration={15} remainingTime={timer} />
        </Box>
        <Box p={1} />
        <Box width="100%" height="1px" bgcolor={theme.palette.divider} />
        <Box p={2} />
        <Grid container direction="column" width="100%" height="100%" spacing={3}>
          {[balanceA, balanceB].map((it, idx) => (
            <Grid item key={it} xs>
              <BalanceButton
                selected={selected === idx}
                color={colors[idx]}
                idx={idx === 0 ? "a" : "b"}
                content={it}
                onClick={() => onClick(idx)}
              />
            </Grid>
          ))}
        </Grid>
      </>
    </SessionModal>
  );
};

interface BalanceButtonProps {
  selected: boolean;
  color: string;
  idx: string;
  content: string;
  onClick: () => void;
}

export const BalanceButton: FC<BalanceButtonProps> = ({
  selected,
  color,
  idx,
  content,
  onClick,
}) => {
  const ref = useSound();
  return (
    <Button
      ref={ref}
      focusRipple
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "15px",
        border: selected ? `4px solid ${color}` : "",
      }}
      onClick={onClick}
    >
      <Stack width="100%" direction="row" justifyContent="start" alignItems="center" p={3}>
        <Typography variant="h3" color={color} mr={1}>
          {idx.toUpperCase()}.
        </Typography>
        <Typography variant="h5">{content}</Typography>
      </Stack>
    </Button>
  );
};
