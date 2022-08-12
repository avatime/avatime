import React, { FC } from "react";
import logo from "../../assets/avartimeLogo.png";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../style.css";

interface IProps {}

/**
 * @author
 * @function @Logo
 **/

export const Logo: FC<IProps> = (props) => {
  const isLogin = useSelector((state: any) => state.user.isLogin);

  return (
    <Box marginTop="5vh" marginBottom="4vh">
      <Link
        to = {isLogin? "/main" : "/"}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={logo} alt="로고" style={{ width: "70%" }} />
      </Link>
    </Box>
  );
};
