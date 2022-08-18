import { Box, Button } from "@mui/material";
import React, { FC, useEffect, useRef } from "react";
import "./LandingPage.css";
import "animate.css";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setBgmPlaying } from "../../stores/slices/bgmSlice";
import Sound from "../../assets/audio/bgm_start.mp3";

interface IProps {}

/**
 * @author
 * @function @LandingPage
 **/

export const LandingPage: FC<IProps> = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(setBgmPlaying(true));
    navigate("/login");
  };

  const ref = useRef<any>();
  useEffect(() => {
    const audio = new Audio(Sound);
    ref.current.addEventListener("mouseenter", () => {
      audio.load();
      audio.play();
    });
  }, []);

  return (
    <div>
      <Box className="landing" sx={{ flexDirection: "column" }}>
        <h1 className="landing--h1">
          <span className="landing--h1--span">A</span>
          <span className="landing--h1--span">V</span>
          <span className="landing--h1--span">A</span>
          <span className="landing--h1--span">T</span>
          <span className="landing--h1--span">I</span>
          <span className="landing--h1--span">M</span>
          <span className="landing--h1--span">E</span>
        </h1>
        <br />
        <h2 className="landing--h2">
          <span className="landing--h2--span">내</span>
          <span className="landing--h2--span">가</span>
          <span className="landing--h2--span"> </span>
          <span className="landing--h2--span">만</span>
          <span className="landing--h2--span">든</span>
          <span className="landing--h2--span"> </span>
          <span className="landing--h2---span">가</span>
          <span className="landing--h2---span">면</span>
          <span className="landing--h2--span">으</span>
          <span className="landing--h2--span">로</span>
          <span className="landing--h2--span"> </span>
          <span className="landing--h2---span">미</span>
          <span className="landing--h2---span">팅</span>
          <span className="landing--h2--span">하</span>
          <span className="landing--h2--span">자</span>
        </h2>
        <Box p={5} />
        <button ref={ref} className="start" style={{ textDecoration: "none" }} onClick={onClick}>
          START
        </button>
      </Box>
    </div>
  );
};
