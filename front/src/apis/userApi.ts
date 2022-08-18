import { NameCheckReq, RegisterReq, UserInfoReq, UserModifyReq } from "./request/memberReq";
import { ProfileRes, RegisterRes, UserInfoRes, UserModifyRes } from "./response/memberRes";
import { RequestConfig } from './avatimeApi';

export interface UserApi {
  checkName(nameCheckReq: NameCheckReq, requestConfig: RequestConfig<boolean>): Promise<void>;
  kakaoLogin(code: string, requestConfig: RequestConfig<any>): Promise<void>;
  naverLogin(code: string, state: string, requestConfig: RequestConfig<any>): Promise<void>;
  getProfileList(requestConfig: RequestConfig<ProfileRes[]>): Promise<void>;
  modifyUser(userModifyReq: UserModifyReq, requestConfig: RequestConfig<UserModifyRes>): Promise<void>;
  register(registerReq: RegisterReq, requestConfig: RequestConfig<RegisterRes>): Promise<void>;
  getUserInfo(userInfoReq: UserInfoReq, requestConfig: RequestConfig<UserInfoRes>): Promise<void>;
}