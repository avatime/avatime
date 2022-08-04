import { NameCheckReq, RegisterReq, UserInfoReq, UserModifyReq } from "./request/memberReq";
import { ProfileRes, RegisterRes, UserInfoRes, UserModifyRes } from "./response/memberRes";
import { axiosInstance } from './axiosInstance';

// interface UserDeleteApi {
//   deleteUser(userInfoReq: UserInfoReq): Promise<SuccessRes>;
// }

// const userDeleteApi: UserDeleteApi = {
//   deleteUser: function (userInfoReq: UserInfoReq): Promise<SuccessRes> {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve({
//           success: true,
//         });
//         alert("회원 탈퇴가 완료되었습니다.");
//       }, 500);
//     });
//   },
// };

// 구현 완료

interface NameCheckApi {
  checkName(nameCheckReq: NameCheckReq): Promise<boolean>;
}

const nameCheckApi: NameCheckApi = {
  checkName: async function (nameCheckReq: NameCheckReq): Promise<boolean> {
    return (await axiosInstance.get(`/auth/check/${nameCheckReq.name}`)).data;
  },
};

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
    return (await axiosInstance.patch(`/user/${userModifyReq.id}`, userModifyReq)).data;
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

interface UserInfoApi {
  getUserInfo(userInfoReq: UserInfoReq): Promise<UserInfoRes>;
}

const userInfoApi: UserInfoApi = {
  getUserInfo: async function (userInfoReq: UserInfoReq): Promise<UserInfoRes> {
    return (await axiosInstance.get(`/user/${userInfoReq.user_id}`)).data;
  },
};

interface UserApi {
  getUserInfo(userReq: UserReq): Promise<UserInfoRes>;
}

export const userApi: UserApi = {
  getUserInfo: async function (userReq: UserReq): Promise<UserInfoRes> {
    return (await axiosInstance.get(`/user/${userReq.userId}`)).data;
  }
}

export {
  profileAllApi,
  userInfoApi,
  registerApi,
  userModifyApi,
  nameCheckApi,
  kakaoLogin,
  naverLogin,
};
