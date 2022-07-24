import React, { FC } from "react";
import './style.css';
import {KAKAO_AUTH_URL, NAVER_AUTH_URL } from '../../apis/Auth';

interface IProps {}

export const SocialLogin: FC<IProps> = (props) => {
  return (
    <div className="social_login">
      <a href={KAKAO_AUTH_URL}>
        <div className="kakao_btn"></div>
      </a>
      <a href={NAVER_AUTH_URL}>
        <div className="naver_btn" ></div>
      </a>
    </div>
  );
};
