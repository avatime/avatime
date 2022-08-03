import axios from "axios";
import { axiosInstance } from '../../apis/axiosInstance';
// dispatch, getState, { history }

const kakaoLogin = (code: string): any => {
  return function () {
    return axiosInstance.get(`/auth/kakao?code=${code}`);
  };
};

const naverLogin = (code: string, state: string): any => {
  return function () {
    return axiosInstance.get(`/auth/naver?code=${code}&state=${state}`);
  };
};

export { kakaoLogin, naverLogin };
