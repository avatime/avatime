import { FC } from "react";
import { Button, ButtonProps, IconButtonProps, IconButton } from '@mui/material';
import { useSound } from "../hooks/useSound";

export const SoundButton: FC<ButtonProps> = (props) => {
  const ref = useSound();
  return (
    <Button ref={ref} {...props}>
      {props.children}
    </Button>
  );
};

export const SoundIconButton: FC<IconButtonProps> = (props) => {
  const ref = useSound();
  return (
    <IconButton ref={ref} {...props}>
      {props.children}
    </IconButton>
  );
}