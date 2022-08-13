import {
  Alert,
  AlertColor,
  AlertTitle,
  Backdrop,
  Box,
  Button,
  Slide,
  SlideProps,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { FC, useState } from "react";

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
  alertColor?: AlertColor;
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
    return <Prompt open={open} onClose={onClose} message={message} onSuccess={onSuccess!} />;
  } else if (type === "confirm") {
    return (
      <Comfirm open={open} onClose={onClose} onSuccess={() => onSuccess?.()} message={message} />
    );
  }
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      onClose={onClose}
      TransitionComponent={SlideTransition}
      autoHideDuration={2000}
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
}

const Prompt: FC<PromptProps> = ({ open, onClose, onSuccess, message }) => {
  const [value, setValue] = useState<string>("");
  const onChange = (e: any) => {
    setValue(e.target.value);
  };
  return (
    <Backdrop open={open}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        TransitionComponent={SlideTransition}
      >
        <Alert
          severity="info"
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
              <Button color="inherit" onClick={onClose}>
                취소
              </Button>
              <Button color="inherit" onClick={() => onSuccess(value)}>
                확인
              </Button>
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
}

const Comfirm: FC<ComfirmProps> = ({ open, onClose, onSuccess, message }) => {
  return (
    <Backdrop open={open}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        TransitionComponent={SlideTransition}
      >
        <Alert
          severity="warning"
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
            <Button color="inherit" onClick={onClose}>
              취소
            </Button>
            <Button color="inherit" onClick={onSuccess}>
              확인
            </Button>
          </Box>
        </Alert>
      </Snackbar>
    </Backdrop>
  );
};
