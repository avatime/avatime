import React, { FC, useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PeopleIcon from "@mui/icons-material/People";
import { Clock } from "./Clock";
import { FinalPickModal } from "./modal/FinalPickModal";
import { useNavigate } from "react-router";
import sessionApi from "../../apis/sessionApi";
import { useSelector } from "react-redux";

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
  const onClickExit = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("정말 나가시겠습니까?")) {
      navigate("/main", { replace: true });
    }
  };

  const onClickPick = () => {
    sessionApi.postStartFinalPick({
      meetingroom_id: meetingRoomId,
    });
  };

  return (
    <ControllBarPresenter
      type={type}
      micStatus={micStatus}
      onChangeMicStatus={onChangeMicStatus}
      cameraStatus={cameraStatus}
      onChangeCameraStatus={onChangeCameraStatus}
      onClickPick={onClickPick}
      onClickExit={onClickExit}
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
  onClickExit: () => void;
  lastPickModalOpen: boolean;
}

export const ControllBarPresenter: FC<IPresenterProps> = ({
  type,
  micStatus,
  onChangeMicStatus,
  cameraStatus,
  onChangeCameraStatus,
  onClickPick,
  onClickExit,
  lastPickModalOpen,
}) => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        {/* <Box width="30%" display="flex" justifyContent="center" alignItems="center">
          <Clock />
        </Box> */}

        <Box flex={1} display="flex" flexDirection="row" justifyContent="space-around" p={2}>
          <Button
            variant="contained"
            color={micStatus ? "secondary" : "error"}
            startIcon={micStatus ? <MicIcon /> : <MicOffIcon />}
            onClick={onChangeMicStatus}
          >
            마이크
          </Button>
          <Button
            variant="contained"
            color={cameraStatus ? "secondary" : "error"}
            startIcon={cameraStatus ? <VideocamIcon /> : <VideocamOffIcon />}
            onClick={onChangeCameraStatus}
          >
            카메라
          </Button>
          {type === "master" && (
            <Button
              variant="contained"
              startIcon={<PeopleIcon />}
              onClick={onClickPick}
              color="secondary"
            >
              최종 선택
            </Button>
          )}
          <Button
            variant="contained"
            startIcon={<ExitToAppIcon />}
            onClick={onClickExit}
            color="error"
          >
            나가기
          </Button>
        </Box>
      </Box>
      {lastPickModalOpen && <FinalPickModal isOpened={lastPickModalOpen} />}
    </>
  );
};
