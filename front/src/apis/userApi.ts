import { UserLoginPostReq } from "./request/userReq";
import { UserLoginPostRes } from "./response/userRes";

interface UserApi {
  postLogin(userLoginPostReq: UserLoginPostReq): UserLoginPostRes;
}

export const userApi: UserApi = {
    postLogin: function (userLoginPostReq: UserLoginPostReq): UserLoginPostRes {
        throw new Error("Function not implemented.");
    }
};
