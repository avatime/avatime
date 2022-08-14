import React, { FC, useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PeopleIcon from "@mui/icons-material/People";
import { FinalPickModal } from "./modal/FinalPickModal";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { AvatimeApi } from "../../apis/avatimeApi";
import { AlertSnackbar } from "../AlertSnackbar";
import { SoundButton } from "../SoundButton";

type Type = "master" | "normal";
interface IProps {
  type: Type;
  onChangeMicStatus: (status: boolean) => void;
  onChangeCameraStatus: (status: boolean) => void;
  lastPickModalOpen: boolean;
}

export const ControllBar: FC<IProps> = ({ type, lastPickModalOpen, ...callback }) => {
  const [micStatus, setMicStatus] = useState(true);
  const onChangeMicStatus = () => {
    setMicStatus((prev) => !prev);
  };
  useEffect(() => {
    callback.onChangeMicStatus(micStatus);
  }, [micStatus, callback]);

  const [cameraStatus, setCameraStatus] = useState(true);
  const onChangeCameraStatus = () => {
    setCameraStatus((prev) => !prev);
  };
  useEffect(() => {
    callback.onChangeCameraStatus(cameraStatus);
  }, [cameraStatus, callback]);

  return (
    <ControllBarPresenter
      type={type}
      micStatus={micStatus}
      onChangeMicStatus={onChangeMicStatus}
      cameraStatus={cameraStatus}
      onChangeCameraStatus={onChangeCameraStatus}
      lastPickModalOpen={lastPickModalOpen}
    />
  );
};

interface IPresenterProps {
  type: Type;
  micStatus: boolean;
  onChangeMicStatus: () => void;
  cameraStatus: boolean;
  onChangeCameraStatus: () => void;
  lastPickModalOpen: boolean;
}

export const ControllBarPresenter: FC<IPresenterProps> = ({
  type,
  micStatus,
  onChangeMicStatus,
  cameraStatus,
  onChangeCameraStatus,
  lastPickModalOpen,
}) => {
  const meetingRoomId = useSelector((state: any) => state.meeting.roomId);
  const [showSnack, setShowSnack] = useState(0);
  const [snackMessage, setSnackMessage] = useState("");

  const navigate = useNavigate();
  const exit = () => {
    navigate("/main", { replace: true });
  };

  const pick = () => {
    setShowSnack(0);
    AvatimeApi.getInstance().postStartFinalPick(
      {
        meetingroom_id: meetingRoomId,
      },
      {
        navigate,
      }
    );
  };

  const onClickPick = () => {
    setShowSnack(1);
    setSnackMessage("정말 최종 선택을 하실 건가요?");
  };

  const onClickExit = () => {
    setShowSnack(2);
    setSnackMessage("정말 나가실 건가요?");
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        {/* <Box width="30%" display="flex" justifyContent="center" alignItems="center">
          <Clock />
        </Box> */}

        <Box flex={1} display="flex" flexDirection="row" justifyContent="space-around">
          <SoundButton
            variant="contained"
            color={micStatus ? "secondary" : "error"}
            startIcon={micStatus ? <MicIcon /> : <MicOffIcon />}
            onClick={onChangeMicStatus}
            sx={{ flex: 1 }}
          >
            마이크
          </SoundButton>
          <Box p={1} />
          <SoundButton
            variant="contained"
            color={cameraStatus ? "secondary" : "error"}
            startIcon={cameraStatus ? <VideocamIcon /> : <VideocamOffIcon />}
            onClick={onChangeCameraStatus}
            sx={{ flex: 1 }}
          >
            카메라
          </SoundButton>
          <Box p={1} />
          {type === "master" && (
            <SoundButton
              variant="contained"
              startIcon={<PeopleIcon />}
              onClick={onClickPick}
              color="secondary"
              sx={{ flex: 1 }}
            >
              최종 선택
            </SoundButton>
          )}
          <Box p={1} />
          <SoundButton
            variant="contained"
            startIcon={<ExitToAppIcon />}
            onClick={onClickExit}
            color="error"
            sx={{ flex: 1 }}
          >
            나가기
          </SoundButton>
        </Box>
      </Box>
      {lastPickModalOpen && <FinalPickModal isOpened={lastPickModalOpen} />}
      <AlertSnackbar
        open={showSnack !== 0}
        onClose={() => setShowSnack(0)}
        message={snackMessage}
        type="confirm"
        onSuccess={showSnack === 1 ? pick : exit}
        alertColor="warning"
      />
    </>
  );
};
