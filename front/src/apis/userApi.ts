import { SuccessRes } from "./response/successRes";
import { UserInfoReq } from "./request/userInfoReq";
import { UserInfoRes } from "./response/userInfoRes";
import { ProfileRes } from "./response/profileRes";
import { UserModifyReq } from "./request/userModifyReq";
import { RegisterReq } from "./request/RegisterReq";
import { LoginKakaoReq } from "./request/loginKakaoReq";

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
          gender: true,
          desc: "자기소개 예시입니다.",
          profile_id: 5,
        });
      }, 500);
    });
  },
};

interface LoginKakaoApi {
  loginkakao(loginKakaoReq: LoginKakaoReq): Promise<void>;
}

const loginKakaoApi: LoginKakaoApi = {
  loginkakao: function (loginKakaoReq: LoginKakaoReq): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
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
