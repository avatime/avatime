import { SuccessRes } from "./response/successRes";
import { UserInfoReq } from "./request/userInfoReq";
import { UserInfoRes } from "./response/userInfoRes";
import { ProfileRes } from "./response/profileRes";
import { UserModifyReq } from "./request/userModifyReq";
import { RegisterReq } from "./request/registerReq";
import { UserReq } from "./request/userReq";
import axios from "axios";

const BASE_URL: string = "http://localhost:8080/api/v1";

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
          profile_image_path: "temp",
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

// 구현 완료

interface NameCheckApi {
  checkName(userInfoReq: UserInfoReq): Promise<SuccessRes>;
}

const nameCheckApi: NameCheckApi = {
  checkName: async function (userInfoReq: UserInfoReq): Promise<SuccessRes> {
    return (await axios.get(`${BASE_URL}/auth/check/${userInfoReq.name}`)).data;
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

interface ProfileAllApi {
  receive: () => Promise<Array<ProfileRes>>;
}

const profileAllApi: ProfileAllApi = {
  receive: async function (): Promise<ProfileRes[]> {
    return (await axios.get(`${BASE_URL}/user/profile`)).data;
  },
};

interface UserModifyApi {
  modifyUser(userModifyReq: UserModifyReq): Promise<SuccessRes>;
}

const userModifyApi: UserModifyApi = {
  modifyUser: async function (userModifyReq: UserModifyReq): Promise<SuccessRes> {
    return (await axios.patch(`${BASE_URL}/user/${userModifyReq.user_id}`, userModifyReq)).data;
  },
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
