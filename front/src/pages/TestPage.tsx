import React, { FC, useEffect } from "react";
import { Link } from "react-router-dom";

interface IProps {}

export const TestPage: FC<IProps> = (props) => {

  useEffect(() => {
    // socketIo();
  }, [])
  
  return (
    <div>
      <Link to="/main">MainPage</Link><br/>
      <Link to="/waiting">WaitingPage</Link><br/>
      <Link to="/session">SessionPage</Link><br/>
      <Link to="/login">LoginPage</Link><br/>
      <Link to="/mypage">MyPage</Link><br/>
      <Link to="/finalPickResult">finalPickResult</Link><br/>
      <Link to="/pickAvatar">PickAvatarPage</Link><br/>
      <Link to="/canvas">Canvas</Link>
    </div>
  );
};
