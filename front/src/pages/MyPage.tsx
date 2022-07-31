import React, { FC } from "react";
import { Container } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { ProfileArea } from "../components/login/ProfileArea";
import { MyPageInfo } from "../components/login/MyPageInfo";
import "../style.css";
import { Logo } from '../components/login/Logo';

interface IProps {}

export const MyPage: FC<IProps> = (props) => {
  return (
    <div className="mainback">
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm" sx={{ height: "100vh" }}>
          <Box display="flex" justifyContent="center" height="100%" alignItems="center">
            <Box
              sx={{
                bgcolor: "#FFFFFF",
                height: "90vh",
                width: "60vw",
                borderRadius: "20px",
              }}
            >
              <Logo />
              <ProfileArea />
            </Box>
          </Box>
        </Container>
      </React.Fragment>
    </div>
  );
};
