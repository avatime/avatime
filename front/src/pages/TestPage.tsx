import React, { FC } from "react";
import { Link } from "react-router-dom";

interface IProps {}

export const TestPage: FC<IProps> = (props) => {
  return (
    <div>
      <Link to="/main">MainPage</Link><br/>
      <Link to="/session">SessionPage</Link><br/>
      <Link to="/login">LoginPage</Link><br/>
      <Link to="/mypage">MyPage</Link><br/>
      <Link to="/finalPickResult">finalPickResult</Link><br/>
    </div>
  );
};
