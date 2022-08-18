import React, { FC } from "react";
import "./Landing/LandingPage.css";

interface IProps {}

export const NotFoundPage: FC<IProps> = (props) => {
  return (
    <div className="mainback">
      <h1 style={{ width: "100%", position: "absolute", top: "20%" }}>
        <span className="landing--h1--span">404</span>
        <br />
        <br />
        <br />
        <span className="landing--h1--span">페이지를 찾을 수 없어요</span>
      </h1>
      <br />
    </div>
  );
};
