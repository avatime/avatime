import React, { FC } from "react";
import logo from "../../assets/avartimeLogo.png";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import "../../style.css";

interface IProps {}

/**
 * @author
 * @function @Logo
 **/

export const Logo: FC<IProps> = (props) => {
  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center" marginBottom="2%">
        <Link to="/">
          <img src={logo} alt="로고" style={{ width: "70%", paddingTop: "2%" }} />
        </Link>
      </Box>
    </>
  );
};