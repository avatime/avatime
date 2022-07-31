import React, { FC } from "react";
import { Container } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { Logo } from "../components/login/Logo";
import { SocialLogin } from "../components/login/SocialLogin";

interface IProps {}

export const LoginPage: FC<IProps> = (props) => {
  return (
    <div className="mainback">
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ height: "100vh" }}>
        <Box
          display="flex"
          justifyContent="center"
          height="100%"
          alignItems="center"
        >
          <Box
            sx={{
              bgcolor: "#FFFFFF",
              height: "90vh",
              width: "60vw",
              borderRadius: "10px",
            }}
          > 
            <Logo />
            <SocialLogin />
          </Box>
        </Box>
      </Container>
    </React.Fragment>
    </div>
  );
};
