import React, { FC} from "react";
import { Link } from "react-router-dom";

interface IProps {}

export const TestPage: FC<IProps> = (props) => {

 
  
  return (
    <div>
      <Link to="/landing">LandingPage</Link><br/>
      <Link to="/main">MainPage</Link><br/>
      <Link to="/waiting">WaitingPage</Link><br/>
      <Link to="/session">SessionPage</Link><br/>
      <Link to="/login">LoginPage</Link><br/>
      <Link to="/mypage">MyPage</Link><br/>
      <Link to="/finalPickResult">finalPickResult</Link><br/>
      <Link to="/pickAvatar">PickAvatarPage</Link><br/>
      <Link to="/canvas">Canvas</Link>
      <Link to="/subSession">SubSession</Link>
    </div>
  );
};
