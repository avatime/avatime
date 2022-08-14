import { Box, Modal, Backdrop, Avatar, TextField, IconButton } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { UserInfoRes } from "../../apis/response/memberRes";
import CancelIcon from "@mui/icons-material/Cancel";
import { AvatimeApi } from "../../apis/avatimeApi";
import { useNavigate } from "react-router";
import { SoundIconButton } from "../SoundButton";

interface IProps {
  open: boolean;
  onClose: () => void;
  userId: number;
  useBackdrop: boolean;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "50vh",
  width: "30vw",
  borderRadius: "20px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export const UserInfoModal: FC<IProps> = ({ open, onClose, userId, useBackdrop }) => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfoRes>();

  useEffect(() => {
    if (userId === -1) {
      return;
    }

    AvatimeApi.getInstance()
      .getUserInfo({ user_id: userId }, {
        onSuccess(data) {
          setUserInfo(data)
        },
        navigate
      })
  }, [navigate, userId]);

  return (
    <Backdrop open={useBackdrop}>
      <Modal open={open}>
        <Box sx={style}>
          <SoundIconButton onClick={onClose} sx={{ position: "absolute", right: "30px" }}>
            <CancelIcon />
          </SoundIconButton>
          <Avatar src={userInfo?.profile_image_path} sx={{ width: "200px", height: "200px" }} />
          <Box p={1} />
          <TextField label="닉네임" variant="outlined" value={userInfo?.name} disabled />
          <Box p={3} />
          <TextField
            multiline
            label="자기소개"
            variant="outlined"
            value={userInfo?.description}
            disabled
            minRows={5}
            maxRows={5}
            fullWidth
          />
        </Box>
      </Modal>
    </Backdrop>
  );
};
