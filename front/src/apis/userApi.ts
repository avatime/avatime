import { NameCheckReq, RegisterReq, UserInfoReq, UserModifyReq } from "./request/memberReq";
import { ProfileRes, RegisterRes, UserInfoRes, UserModifyRes } from "./response/memberRes";
import { RequestConfig } from './avatimeApi';

export interface UserApi {
  checkName(nameCheckReq: NameCheckReq, requestConfig: RequestConfig<boolean>): void;
  kakaoLogin(code: string, requestConfig: RequestConfig<any>): void;
  naverLogin(code: string, state: string, requestConfig: RequestConfig<any>): void;
  getProfileList(requestConfig: RequestConfig<ProfileRes[]>): void;
  modifyUser(userModifyReq: UserModifyReq, requestConfig: RequestConfig<UserModifyRes>): void;
  register(registerReq: RegisterReq, requestConfig: RequestConfig<RegisterRes>): void;
  getUserInfo(userInfoReq: UserInfoReq, requestConfig: RequestConfig<UserInfoRes>): void;
}