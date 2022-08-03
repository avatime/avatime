import { SuccessRes } from "./response/successRes";
import { UserInfoReq } from "./request/userInfoReq";
import { UserInfoRes } from "./response/userInfoRes";
import { ProfileRes } from "./response/profileRes";
import { UserModifyReq } from "./request/userModifyReq";
import { RegisterReq } from "./request/registerReq";
import { UserReq } from "./request/userReq";
import { RegisterRes } from "./response/registerRes";
import { UserModifyRes } from "./response/userModifyRes";
import { axiosInstance } from './axiosInstance';

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

// 구현 완료

interface NameCheckApi {
  checkName(userInfoReq: UserInfoReq): Promise<boolean>;
}

const nameCheckApi: NameCheckApi = {
  checkName: async function (userInfoReq: UserInfoReq): Promise<boolean> {
    return (await axiosInstance.get(`/auth/check/${userInfoReq.name}`)).data;
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
    return axiosInstance.get(`/auth/kakao?code=${code}`);
  };
};

const naverLogin = (code: string, state: string): any => {
  return function () {
    return axiosInstance.get(`/auth/naver?code=${code}&state=${state}`);
  };
};

interface ProfileAllApi {
  receive: () => Promise<Array<ProfileRes>>;
}

const profileAllApi: ProfileAllApi = {
  receive: async function (): Promise<ProfileRes[]> {
    return (await axiosInstance.get(`/user/profile`)).data;
  },
};

interface UserModifyApi {
  modifyUser(userModifyReq: UserModifyReq): Promise<UserModifyRes>;
}

const userModifyApi: UserModifyApi = {
  modifyUser: async function (userModifyReq: UserModifyReq): Promise<UserModifyRes> {
    return (await axiosInstance.patch(`/user/${userModifyReq.user_id}`, userModifyReq)).data;
  },
};

interface RegisterApi {
  register(registerReq: RegisterReq): Promise<RegisterRes>;
}

const registerApi: RegisterApi = {
  register: async function (registerReq: RegisterReq): Promise<RegisterRes> {
    return (await axiosInstance.post(`/auth/register`, registerReq)).data;
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
