import { UserLoginPostReq } from "./request/userReq";
import { UserLoginPostRes } from "./response/userRes";
import { UserInfoRes } from "./response/userInfoRes";

interface UserApi {
  postLogin(userLoginPostReq: UserLoginPostReq): UserLoginPostRes;
}

interface MyPageApi {
  getMyInfo(userReq: UserLoginPostReq): Promise<UserInfoRes>;
}

export const userApi: UserApi = {
    postLogin: function (userLoginPostReq: UserLoginPostReq): UserLoginPostRes {
        throw new Error("Function not implemented.");
    }
};

export const myPageApi: MyPageApi = {
  getMyInfo: function (userReq: UserLoginPostReq): Promise<UserInfoRes> {
    throw new Error("Function not implemented.");
  }
};
