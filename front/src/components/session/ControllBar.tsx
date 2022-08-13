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

type Type = "master" | "normal";
interface IProps {
  type: Type;
  onChangeMicStatus: (status: boolean) => void;
  onChangeCameraStatus: (status: boolean) => void;
  lastPickModalOpen: boolean;
}

export const ControllBar: FC<IProps> = ({ type, lastPickModalOpen, ...callback }) => {
  const meetingRoomId = useSelector((state: any) => state.meeting.roomId);

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

  const navigate = useNavigate();
  const onClickPick = () => {
    AvatimeApi.getInstance().postStartFinalPick(
      {
        meetingroom_id: meetingRoomId,
      },
      {
        navigate,
      }
    );
  };

  return (
    <ControllBarPresenter
      type={type}
      micStatus={micStatus}
      onChangeMicStatus={onChangeMicStatus}
      cameraStatus={cameraStatus}
      onChangeCameraStatus={onChangeCameraStatus}
      onClickPick={onClickPick}
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
  onClickPick: () => void;
  lastPickModalOpen: boolean;
}

export const ControllBarPresenter: FC<IPresenterProps> = ({
  type,
  micStatus,
  onChangeMicStatus,
  cameraStatus,
  onChangeCameraStatus,
  onClickPick,
  lastPickModalOpen,
}) => {
  const [showSnack, setShowSnack] = useState(false);

  const navigate = useNavigate();
  const exit = () => {
    navigate("/main", { replace: true });
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        {/* <Box width="30%" display="flex" justifyContent="center" alignItems="center">
          <Clock />
        </Box> */}

        <Box flex={1} display="flex" flexDirection="row" justifyContent="space-around">
          <Button
            variant="contained"
            color={micStatus ? "secondary" : "error"}
            startIcon={micStatus ? <MicIcon /> : <MicOffIcon />}
            onClick={onChangeMicStatus}
            sx={{ flex: 1 }}
          >
            마이크
          </Button>
          <Box p={1} />
          <Button
            variant="contained"
            color={cameraStatus ? "secondary" : "error"}
            startIcon={cameraStatus ? <VideocamIcon /> : <VideocamOffIcon />}
            onClick={onChangeCameraStatus}
            sx={{ flex: 1 }}
          >
            카메라
          </Button>
          <Box p={1} />
          {type === "master" && (
            <Button
              variant="contained"
              startIcon={<PeopleIcon />}
              onClick={onClickPick}
              color="secondary"
              sx={{ flex: 1 }}
            >
              최종 선택
            </Button>
          )}
          <Box p={1} />
          <Button
            variant="contained"
            startIcon={<ExitToAppIcon />}
            onClick={() => setShowSnack(true)}
            color="error"
            sx={{ flex: 1 }}
          >
            나가기
          </Button>
        </Box>
      </Box>
      {lastPickModalOpen && <FinalPickModal isOpened={lastPickModalOpen} />}
      <AlertSnackbar
        open={showSnack}
        onClose={() => setShowSnack(false)}
        message="정말 나가실 건가요?"
        type="confirm"
        onSuccess={exit}
        alertColor="warning"
      />
    </>
  );
};
