
import react, { FC } from "react";
import axios from "axios";
// dispatch, getState, { history }

const kakaoLogin = (code: string): any => {
    return function() {
        return axios.get(`http://localhost:8080/api/v1/auth/kakao?code=${code}`)
    }
};

  export default kakaoLogin;