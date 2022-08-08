import { Box, Modal } from "@mui/material";
import React, { FC } from "react";

type JustifyContent = "center" | "stretch";

interface IProps {
  open: boolean;
  onClose?: () => void;
  children: JSX.Element;
  justifyContent: JustifyContent;
}

export const ResultWaitingModal: FC<IProps> = ({ open, onClose, children, justifyContent }) => {
  return (
    <Modal open={open} onClose={onClose} onClick={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "35%",
          height: "35%",
          bgcolor: "background.paper",
          border: "1px solid #000000",
          boxShadow: 24,
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: justifyContent,
          alignItems: "end",
        }}
      >
        {children}
      </Box>
    </Modal>
  );
};
