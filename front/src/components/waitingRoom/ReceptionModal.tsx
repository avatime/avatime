import {
  Box,
  Modal,
  Typography,
  Backdrop,
  List,
  ListItem,
  Divider,
  IconButton,
} from "@mui/material";
import React, { FC } from "react";
import { WaitingUser } from "../../apis/response/waitingRoomRes";
import { CandidateUser } from "./CandidateUser";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { AvatimeApi } from "../../apis/avatimeApi";
import { useNavigate } from "react-router";
import { SoundIconButton } from '../SoundButton';

interface IProps {
  open: boolean;
  onClickClose: () => void;
  candidateList: WaitingUser[];
  isMaster: boolean;
}

export const ReceptionModal: FC<IProps> = ({ open, onClickClose, candidateList, isMaster }) => {
  const navigate = useNavigate();
  const roomId = useSelector((state: any) => state.waiting.roomId);
  const onClickAccept = (userId: number) => {
    AvatimeApi.getInstance().requestEnterRoom(
      {
        room_id: roomId,
        user_id: userId,
        type: 1,
      },
      { navigate }
    );
  };
  const onClickRefuse = (userId: number) => {
    AvatimeApi.getInstance().requestEnterRoom(
      {
        room_id: roomId,
        user_id: userId,
        type: 4,
      },
      { navigate }
    );
  };

  return (
    <Backdrop open={open}>
      <Modal open={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "30%",
            height: "70%",
            bgcolor: "background.paper",
            border: "1px solid #000000",
            boxShadow: 24,
            p: 2,
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
          }}
        >
          <Box position="relative">
            <SoundIconButton onClick={onClickClose} sx={{ right: "0", position: "absolute" }}>
              <CloseIcon />
            </SoundIconButton>
            <Typography variant="h5">접수처</Typography>
            <Box p={1} />
            {candidateList.length === 0 ? (
              <Typography variant="h6" textAlign="center">
                참가 신청한 사람이 없어요
              </Typography>
            ) : (
              <List>
                {candidateList.map((it) => (
                  <Box key={it.id}>
                    <ListItem disablePadding>
                      <CandidateUser
                        waitingUser={it}
                        onClickAccept={onClickAccept}
                        onClickRefuse={onClickRefuse}
                        isMaster={isMaster}
                      />
                    </ListItem>
                    <Box m={1}>
                      <Divider />
                    </Box>
                  </Box>
                ))}
              </List>
            )}
          </Box>
        </Box>
      </Modal>
    </Backdrop>
  );
};
