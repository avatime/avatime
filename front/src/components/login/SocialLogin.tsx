import React, { FC, useEffect } from "react";
import "./style.css";
import { KAKAO_AUTH_URL, NAVER_AUTH_URL } from "../../apis/Auth";
import { useSound } from "../../hooks/useSound";

interface IProps {}

export const SocialLogin: FC<IProps> = (props) => {
  const ref1 = useSound();
  const ref2 = useSound();

  return (
    <div className="social_login">
      <a ref={ref1} id="kakao-login-btn" href={KAKAO_AUTH_URL} style={{ marginBottom: "6vh" }}>
        <img
          src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg"
          height="60"
          alt="카카오로그인"
        />
      </a>
      <a ref={ref2} id="naver-login-btn" href={NAVER_AUTH_URL}>
        <img
          src="https://static.nid.naver.com/oauth/big_g.PNG?version=js-2.0.1"
          height="60"
          alt="네이버로그인"
        />
      </a>
    </div>
  );
};
