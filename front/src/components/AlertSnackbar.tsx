import {
  Alert,
  AlertColor,
  AlertTitle,
  Backdrop,
  Box,
  Slide,
  SlideProps,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { FC, useState } from "react";
import { SoundButton } from './SoundButton';

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="down" />;
}

type Type = "alert" | "confirm" | "prompt";

const alertStyle = {
  boxShadow: "7px 7px 7px rgba(0, 0, 0, 0.2)",
  borderRadius: "10px",
};

interface IProps {
  open: boolean;
  onClose: () => void;
  message: string;
  alertColor: AlertColor;
  type: Type;
  onSuccess?: (value?: string) => void;
}

export const AlertSnackbar: FC<IProps> = ({
  open,
  onClose,
  message,
  alertColor,
  type,
  onSuccess,
}) => {
  if (type === "prompt") {
    return (
      <Prompt
        open={open}
        onClose={onClose}
        message={message}
        onSuccess={onSuccess!}
        alertColor={alertColor}
      />
    );
  } else if (type === "confirm") {
    return (
      <Comfirm
        open={open}
        onClose={onClose}
        onSuccess={() => onSuccess?.()}
        message={message}
        alertColor={alertColor}
      />
    );
  }
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      onClose={onClose}
      TransitionComponent={SlideTransition}
      autoHideDuration={4000}
    >
      <Alert onClose={onClose} severity={alertColor} sx={alertStyle}>
        <Typography variant="subtitle2">{message}</Typography>
      </Alert>
    </Snackbar>
  );
};

interface PromptProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (value: string) => void;
  message: string;
  alertColor: AlertColor;
}

const Prompt: FC<PromptProps> = ({ open, onClose, onSuccess, message, alertColor }) => {
  const [value, setValue] = useState<string>("");
  const onChange = (e: any) => {
    setValue(e.target.value);
  };
  const onClickOk = () => {
    onSuccess(value);
    setValue("");
  }
  return (
    <Backdrop open={open}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        TransitionComponent={SlideTransition}
      >
        <Alert
          severity={alertColor}
          action={<></>}
          sx={{
            width: "550px",
            paddingTop: "30px",
            ...alertStyle,
          }}
        >
          <AlertTitle>
            <Typography variant="h6">{message}</Typography>
          </AlertTitle>
          <Box>
            <Box p={1} />
            <TextField
              sx={{
                width: "500px",
              }}
              size="small"
              value={value}
              onChange={onChange}
            />
            <Box p={1} />
            <Box width="100%" display="flex" justifyContent="end">
              <SoundButton color="inherit" onClick={onClose}>
                취소
              </SoundButton>
              <SoundButton color="inherit" onClick={onClickOk}>
                확인
              </SoundButton>
            </Box>
          </Box>
        </Alert>
      </Snackbar>
    </Backdrop>
  );
};

interface ComfirmProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  message: string;
  alertColor: AlertColor;
}

const Comfirm: FC<ComfirmProps> = ({ open, onClose, onSuccess, message, alertColor }) => {
  return (
    <Backdrop open={open}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        TransitionComponent={SlideTransition}
      >
        <Alert
          severity={alertColor}
          action={<></>}
          sx={{
            width: "450px",
            ...alertStyle,
          }}
        >
          <AlertTitle>
            <Typography variant="h6">{message}</Typography>
          </AlertTitle>
          <Box p={1} />
          <Box width="400px" display="flex" justifyContent="end">
            {alertColor !== "success" && (
              <SoundButton color="inherit" onClick={onClose}>
                취소
              </SoundButton>
            )}
            <SoundButton color="inherit" onClick={onSuccess}>
              확인
            </SoundButton>
          </Box>
        </Alert>
      </Snackbar>
    </Backdrop>
  );
};
