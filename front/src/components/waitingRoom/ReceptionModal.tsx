import { Box, Modal, Typography, Backdrop, List, ListItem, Divider } from "@mui/material";
import React, { FC } from "react";
import { WaitingUser } from "../../apis/response/waitingRoomRes";
import { CandidateUser } from "./CandidateUser";

interface IProps {
  open: boolean;
  onClickClose: () => void;
  candidateList: WaitingUser[];
}

export const ReceptionModal: FC<IProps> = ({ open, onClickClose, candidateList }) => {
  const onClickAccept = () => {};
  const onClickRefuse = () => {};

  return (
    <Backdrop open={open}>
      <Modal open={open} onClose={onClickClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            height: "70%",
            bgcolor: "background.paper",
            border: "1px solid #000000",
            boxShadow: 24,
            p: 2,
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">접수처</Typography>
          <Box p={1} />
          <List>
            {candidateList.map((it) => (
              <Box key={it.id}>
                <ListItem disablePadding>
                  <CandidateUser
                    waitingUser={it}
                    onClickAccept={onClickAccept}
                    onClickRefuse={onClickRefuse}
                  />
                </ListItem>
                <Box m={1}>
                  <Divider />
                </Box>
              </Box>
            ))}
          </List>
        </Box>
      </Modal>
    </Backdrop>
  );
};
