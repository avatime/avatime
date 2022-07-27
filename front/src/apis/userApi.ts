import { SuccessRes } from "./response/successRes";
import { UserInfoReq } from "./request/userInfoReq";
import { UserInfoRes } from "./response/userInfoRes";
import { ProfileRes } from "./response/profileRes";
import { UserModifyReq } from "./request/userModifyReq";
import { RegisterReq } from "./request/registerReq";
import { UserReq } from "./request/userReq";
import axios from "axios";

const BASE_URL: string = "http://localhost:8080/api/v1";

interface ProfileAllApi {
  receive: () => Promise<Array<ProfileRes>>;
}

const profileAllApi: ProfileAllApi = {
  receive: function (): Promise<ProfileRes[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            profilePath: "https://jira.ssafy.com/secure/useravatar?avatarId=10334",
            name: "tmp",
          },
          {
            profilePath: "https://jira.ssafy.com/secure/useravatar?avatarId=10347",
            name: "tmp",
          },
          {
            profilePath: "https://jira.ssafy.com/secure/useravatar?avatarId=10341",
            name: "tmp",
          },
          {
            profilePath: "https://jira.ssafy.com/secure/useravatar?avatarId=10505",
            name: "tmp",
          },
          {
            profilePath: "https://jira.ssafy.com/secure/useravatar?avatarId=10351",
            name: "tmp",
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

// 구현 완료

interface NameCheckApi {
  checkName(userInfoReq: UserInfoReq): Promise<SuccessRes>;
}

const nameCheckApi: NameCheckApi = {
  checkName: async function (userInfoReq: UserInfoReq): Promise<SuccessRes> {
    return (await axios.get(`${BASE_URL}/user/check/${userInfoReq.name}`)).data;
  },
};

// interface ProfileApi {
//   getProfile(userReq: UserReq): Promise<ProfileRes>;
// }

// const profileApi: ProfileApi = {
//   getProfile: async function (userReq: UserReq): Promise<ProfileRes> {
//     return (await axios.get(`${BASE_URL}/user/profile/${userReq.id}`)).data;
//   },
// };

const kakaoLogin = (code: string): any => {
  return function () {
    return axios.get(`http://localhost:8080/api/v1/auth/kakao?code=${code}`);
  };
};

const naverLogin = (code: string, state: string): any => {
  return function () {
    return axios.get(`http://localhost:8080/api/v1/auth/naver?code=${code}&state=${state}`);
  };
};

export {
  profileAllApi,
  userDeleteApi,
  userInfoApi,
  registerApi,
  userModifyApi,
  nameCheckApi,
  kakaoLogin,
  naverLogin,
};
