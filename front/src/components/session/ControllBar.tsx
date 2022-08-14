import React, { FC, useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Button, Menu, MenuItem } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PeopleIcon from "@mui/icons-material/People";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { AvatimeApi } from "../../apis/avatimeApi";
import { AlertSnackbar } from "../AlertSnackbar";
import { SoundButton } from "../SoundButton";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import BalanceIcon from "@mui/icons-material/Balance";
import FavoriteIcon from "@mui/icons-material/Favorite";

type Type = "master" | "normal";
interface IProps {
  type: Type;
  onChangeMicStatus: (status: boolean) => void;
  onChangeCameraStatus: (status: boolean) => void;
}

export const ControllBar: FC<IProps> = ({
  type,
  ...callback
}) => {
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
    />
  );
};

interface IPresenterProps {
  type: Type;
  micStatus: boolean;
  onChangeMicStatus: () => void;
  cameraStatus: boolean;
  onChangeCameraStatus: () => void;
}

export const ControllBarPresenter: FC<IPresenterProps> = ({
  type,
  micStatus,
  onChangeMicStatus,
  cameraStatus,
  onChangeCameraStatus,
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

  const [showMenu, setShowMenu] = useState(false);
  const onClickMinigame = () => {
    setShowMenu((prev) => !prev);
  };

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const onClickBalanceGame = () => {
    setShowMenu(false);
    AvatimeApi.getInstance().postStartBalanceGame(
      {
        meetingroom_id: meetingRoomId,
      },
      {
        onFailure(error) {
          setShowAlert(true);
          setAlertMessage("더 이상 밸런스 게임을 할 수 없어요 !!");
        },
        navigate,
      }
    );
  };

  const onClickPickStuff = () => {
    setShowMenu(false);
    AvatimeApi.getInstance().getStartPickStuff(
      {
        meetingroom_id: meetingRoomId,
      },
      {
        onFailure(error) {
          setShowAlert(true);
          setAlertMessage("더 이상 물건 고르기 게임을 할 수 없어요 !!");
        },
        navigate,
      }
    );
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
            <>
              <SoundButton
                variant="contained"
                startIcon={<VideogameAssetIcon />}
                onClick={onClickMinigame}
                color="secondary"
                sx={{ flex: 1 }}
              >
                미니 게임
              </SoundButton>
              <Box p={1} />
              <SoundButton
                variant="contained"
                startIcon={<PeopleIcon />}
                onClick={onClickPick}
                color="secondary"
                sx={{ flex: 1 }}
              >
                최종 선택
              </SoundButton>
            </>
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

      <AlertSnackbar
        open={showSnack !== 0}
        onClose={() => setShowSnack(0)}
        message={snackMessage}
        type="confirm"
        onSuccess={showSnack === 1 ? pick : exit}
        alertColor="warning"
      />
      <Menu
        sx={{
          position: "absolute",
          left: "-12.5%",
          top: "-7%",
          justifyContent: "center",
          flexDirection: "center",
          textAlign: "center",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        keepMounted
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={showMenu}
        onClose={() => setShowMenu(false)}
      >
        <MenuItem sx={{ display: "flex", flexDirection: "center", justifyContent: "center" }}>
          <SoundButton
            onClick={onClickBalanceGame}
            style={{ textDecoration: "none", color: "black" }}
            startIcon={<BalanceIcon />}
          >
            밸런스 게임
          </SoundButton>
        </MenuItem>
        <MenuItem sx={{ display: "flex", flexDirection: "center", justifyContent: "center" }}>
          <SoundButton
            onClick={onClickPickStuff}
            style={{ textDecoration: "none", color: "black" }}
            startIcon={<FavoriteIcon />}
          >
            물건 고르기
          </SoundButton>
        </MenuItem>
      </Menu>
      <AlertSnackbar
        open={showAlert}
        onClose={() => setShowAlert(false)}
        message={alertMessage}
        alertColor="error"
        type="alert"
      />
    </>
  );
};
