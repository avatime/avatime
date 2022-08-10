import {
  Box,
  Modal,
  Backdrop,
  Avatar,
  TextField,
  IconButton,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { UserInfoRes } from "../../apis/response/memberRes";
import { userInfoApi } from "../../apis/userApi";
import CancelIcon from "@mui/icons-material/Cancel";

interface IProps {
  open: boolean;
  onClose: () => void;
  userId: number;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "90vh",
  width: "50vw",
  borderRadius: "20px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export const UserInfoModal: FC<IProps> = ({ open, onClose, userId }) => {
  const [userInfo, setUserInfo] = useState<UserInfoRes>();

  useEffect(() => {
    if (userId === -1) {
      return;
    }
    userInfoApi.getUserInfo({ user_id: userId }).then((data) => setUserInfo(data));
  }, [userId]);

  

  return (
    <Backdrop open={open}>
      <Modal open={open}>
        <Box sx={style}>
          <IconButton onClick={onClose} sx={{ position: "absolute", right: "30px" }}>
            <CancelIcon />
          </IconButton>
          <Avatar src={userInfo?.profile_image_path} sx={{ width: "200px", height: "200px" }} />
          <Box p={1} />
          <TextField label="아이디" variant="outlined" value={userInfo?.name} disabled />
          <Box p={1} />
          <TextField
            multiline
            label="자기소개"
            variant="outlined"
            value={userInfo?.description}
            disabled
            minRows={4}
            maxRows={6}
            fullWidth
          />
        </Box>
      </Modal>
    </Backdrop>
  );
};
