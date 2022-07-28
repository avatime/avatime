import React, { FC } from "react";
import { Container } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { Logo } from "../components/login/Logo";
import { ProfileArea } from "../components/login/ProfileArea";

interface IProps {}

export const MyPage: FC<IProps> = (props) => {
  return (
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
              bgcolor: "#cfe8fc",
              height: "90vh",
              width: "60vw",  
              borderRadius: "7%",
            }}
          >
            <Logo />
            <ProfileArea />
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
};
