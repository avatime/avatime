import React, { FC } from "react";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import './style.css';

interface IProps {}

export const Logo: FC<IProps> = (props) => {
  return (
    <Button className="logo_div">
      <Link to="/">
        <img src="../../assets/logo_temp.png" alt="" />
      </Link>
    </Button>
  );
};
