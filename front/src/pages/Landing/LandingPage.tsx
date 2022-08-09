import { Box } from "@mui/material";
import React, { FC } from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";
interface IProps {}

/**
 * @author
 * @function @LandingPage
 **/

export const LandingPage: FC<IProps> = (props) => {
  return (
   
      <Box className="landing">
        <Link to="/login">
          <h1 className="landing--h1">
            <span className="landing--h1--span">A</span>
            <span className="landing--h1--span">V</span>
            <span className="landing--h1--span">A</span>
            <span className="landing--h1--span">T</span>
            <span className="landing--h1--span">I</span>
            <span className="landing--h1--span">M</span>
            <span className="landing--h1--span">E</span>
          </h1>
        </Link>
      </Box>
   
  );
};
