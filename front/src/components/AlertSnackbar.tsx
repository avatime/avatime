import { Alert, AlertColor, Slide, SlideProps, Snackbar } from "@mui/material";
import React, { FC } from "react";

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="down" />;
}

interface IProps {
  open: boolean;
  onClose: () => void;
  message: string;
  alertColor: AlertColor;
}

export const AlertSnackbar: FC<IProps> = ({ open, onClose, message, alertColor }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={true}
      onClose={onClose}
      TransitionComponent={SlideTransition}
      autoHideDuration={2000}
      sx={{
        boxShadow: "7px 7px 7px rgba(0, 0, 0, 0.2)",
        borderRadius: "10px",
      }}
    >
      <Alert onClose={onClose} severity={alertColor} sx={{ width: "100%" }}>
        누군가 참가 신청을 했어요!!
      </Alert>
    </Snackbar>
  );
};
