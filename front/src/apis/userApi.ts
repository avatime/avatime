import { SuccessRes } from "./response/successRes";
import { UserInfoReq } from "./request/userInfoReq";
import { UserInfoRes } from "./response/userInfoRes";
import { ProfileRes } from "./response/profileRes";
import { UserModifyReq } from "./request/userModifyReq";
import { RegisterReq } from "./request/registerReq";
import { LoginKakaoReq } from "./request/loginKakaoReq";
import { loginInfoKakaoRes } from "./response/loginInfoKakaoRes";
import axios from "axios";

const BASE_URL: string = "http://localhost:8080/api/v1";

interface ProfileApi {
  receive: () => Promise<Array<ProfileRes>>;
}

const profileApi: ProfileApi = {
  receive: function (): Promise<ProfileRes[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            profilePath: "https://jira.ssafy.com/secure/useravatar?avatarId=10334",
          },
          {
            profilePath: "https://jira.ssafy.com/secure/useravatar?avatarId=10347",
          },
          {
            profilePath: "https://jira.ssafy.com/secure/useravatar?avatarId=10341",
          },
          {
            profilePath: "https://jira.ssafy.com/secure/useravatar?avatarId=10505",
          },
          {
            profilePath: "https://jira.ssafy.com/secure/useravatar?avatarId=10351",
          },
        ]);
      }, 500);
    });
  },
};

interface UserDeleteApi {
  deleteUser(userInfoReq: UserInfoReq): Promise<SuccessRes>;
}

const userDeleteApi: UserDeleteApi = {
  deleteUser: function (userInfoReq: UserInfoReq): Promise<SuccessRes> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
        });
        alert("회원 탈퇴가 완료되었습니다.");
      }, 500);
    });
  },
};

interface UserInfoApi {
  getMyInfo(userInfoReq: UserInfoReq): Promise<UserInfoRes>;
}

const userInfoApi: UserInfoApi = {
  getMyInfo: function (userInfoReq: UserInfoReq): Promise<UserInfoRes> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          name: "홍길동",
          gender: "M",
          description: "자기소개 예시입니다.",
          profile_id: 5,
        });
      }, 500);
    });
  },
};

interface LoginKakaoApi {
  loginkakao(): Promise<loginInfoKakaoRes>;
}

const loginKakaoApi: LoginKakaoApi = {
  loginkakao: function (): Promise<loginInfoKakaoRes> {
    const REST_API_KEY: string = "6300198dbbef93aac1c88f68eeb4525a";
    const REDIRECT_URI: string = "http://localhost:3000/api/v1/auth/kakao";
    // /oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          social_id: "ssafy@ssafy.com",
          gender: "F",
          social_type: "kakao",
          token: "123456789",
        });
        console.log("kakao login api 호출");
      }, 1000);
    });
  },
};

interface RegisterApi {
  register(registerReq: RegisterReq): Promise<SuccessRes>;
}

const registerApi: RegisterApi = {
  register: function (registerReq: RegisterReq): Promise<SuccessRes> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
        });
        alert("회원가입이 완료되었습니다.");
      }, 500);
    });
  },
};

interface UserModifyApi {
  modifyUser(userModifyReq: UserModifyReq): Promise<SuccessRes>;
}

const userModifyApi: UserModifyApi = {
  modifyUser: function (userModifyReq: UserModifyReq): Promise<SuccessRes> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
        });
        alert("회원 정보 수정이 완료되었습니다.");
      }, 500);
    });
  },
};

interface NameCheckApi {
  checkName(userInfoReq: UserInfoReq): Promise<SuccessRes>;
}

const nameCheckApi: NameCheckApi = {
  checkName: function (userInfoReq: UserInfoReq): Promise<SuccessRes> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
        });
        console.log("nameCheckApi 호출");
      }, 500);
    });
  },
};

export {
  profileApi,
  userDeleteApi,
  userInfoApi,
  loginKakaoApi,
  registerApi,
  userModifyApi,
  nameCheckApi,
};
