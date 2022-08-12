import axios, { AxiosInstance, Method } from "axios";
import { API_BASE_URL } from "./url";
import { SessionApi } from "./sessionApi";
import {
  MeetingRoomInfoReq,
  FinalPickReq,
  FinalPickResultReq,
  StartFinalPickReq,
} from "./request/sessionReq";
import { NavigateFunction } from "react-router";
import { ChatApi } from "./chatApi";
import { ChatMessageReq } from "./request/chatReq";
import { MeetingRoomInfoRes, FinalPickResultRes, FinalPickRes } from './response/sessionRes';
import { WaitingApi } from "./waitingApi";
import { WaitingRoomMakeReq, StartPickAvatarReq, RequestEnterRoomReq } from "./request/waitingRoomReq";
import { SidoRes, AgeRes, RequestEnterRoomRes } from "./response/waitingRoomRes";
import { UserApi } from './userApi';
import { NameCheckReq, UserModifyReq, RegisterReq, UserInfoReq } from "./request/memberReq";
import { ProfileRes, UserModifyRes, RegisterRes, UserInfoRes } from "./response/memberRes";
import { AvatarApi } from './avatarApis';
import { SelectAvatarReq, AvatarNameCheckReq, GetAvatarReq, GetAvatarAllReq, SaveAvatarReq } from "./request/avatarReq";
import { GetAvatarRes, SaveAvatarRes } from "./response/avatarRes";
import { SuccessRes } from "./response/successRes";

export interface RequestConfig<R> {
  onSuccess?(data: R): void;
  onFailure?(error: any): void;
  navigate: NavigateFunction;
}

interface Config<P, R> {
  method: Method;
  url: string;
  data?: P;
  onSuccess?(data: R): void;
  onFailure?(error: any): void;
  navigate: NavigateFunction;
}

export class AvatimeApi implements SessionApi, ChatApi, WaitingApi, UserApi, AvatarApi {
  private static instance: AvatimeApi;
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = this.createAxiosInstance();
  }

  // Avatar API ====================================================================
  pickAvatar(selectAvatarReq: SelectAvatarReq, requestConfig: RequestConfig<SuccessRes>): void {
    this.request<SelectAvatarReq, SuccessRes>({
      method: "patch",
      url: `/meeting/selectAvatar`,
      data: selectAvatarReq,
      ...requestConfig,
    });
  }
  checkAvatarName(avatarNameCheckReq: AvatarNameCheckReq, requestConfig: RequestConfig<boolean>): void {
    this.request<AvatarNameCheckReq, boolean>({
      method: "get",
      url: `/auth/check/${avatarNameCheckReq.name}`,
      ...requestConfig,
    });
  }
  getAvatarList(getAvatarAllReq: GetAvatarAllReq, requestConfig: RequestConfig<GetAvatarRes[]>): void {
    this.request<GetAvatarAllReq, GetAvatarRes[]>({
      method: "get",
      url: `/avatar/load/${getAvatarAllReq.user_id}`,
      ...requestConfig,
    });
  }
  saveAvatar(saveAvatarReq: SaveAvatarReq, requestConfig: RequestConfig<SaveAvatarRes>): void {
    this.request<SaveAvatarReq, SaveAvatarRes>({
      method: "post",
      url: `/avatar/custom`,
      data: saveAvatarReq,
      ...requestConfig,
    });
  }
  getAvatar(getAvatarReq: GetAvatarReq, requestConfig: RequestConfig<GetAvatarRes>): void {
    this.request<GetAvatarReq, GetAvatarRes>({
      method: "get",
      url: `/avatar/get/${getAvatarReq.user_id}/${getAvatarReq.slot}`,
      ...requestConfig,
    });
  }

  // User API ====================================================================
  checkName(nameCheckReq: NameCheckReq, requestConfig: RequestConfig<boolean>): void {
    this.request<NameCheckReq, boolean>({
      method: "get",
      url: `/auth/check/${nameCheckReq.name}`,
      ...requestConfig,
    });
  }
  kakaoLogin(code: string, requestConfig: RequestConfig<any>): void {
    this.request<NameCheckReq, boolean>({
      method: "get",
      url: `/auth/kakao?code=${code}`,
      ...requestConfig,
    });
  }
  naverLogin(code: string, state: string, requestConfig: RequestConfig<any>): void {
    this.request<NameCheckReq, boolean>({
      method: "get",
      url: `/auth/naver?code=${code}&state=${state}`,
      ...requestConfig,
    });
  }
  getProfileList(requestConfig: RequestConfig<ProfileRes[]>): void {
    this.request<void, ProfileRes[]>({
      method: "get",
      url: `/user/profile`,
      ...requestConfig,
    });
  }
  modifyUser(userModifyReq: UserModifyReq, requestConfig: RequestConfig<UserModifyRes>): void {
    this.request<UserModifyReq, UserModifyRes>({
      method: "patch",
      url: `/user/${userModifyReq.id}`,
      data: userModifyReq,
      ...requestConfig,
    });
  }
  register(registerReq: RegisterReq, requestConfig: RequestConfig<RegisterRes>): void {
    this.request<RegisterReq, RegisterRes>({
      method: "post",
      url: `/auth/register`,
      data: registerReq,
      ...requestConfig,
    });
  }
  getUserInfo(userInfoReq: UserInfoReq, requestConfig: RequestConfig<UserInfoRes>): void {
    this.request<UserInfoReq, UserInfoRes>({
      method: "get",
      url: `/user/${userInfoReq.user_id}`,
      ...requestConfig,
    });
  }

  // Waiting API ===========================================================
  getSidoList(requestConfig: RequestConfig<SidoRes[]>): void {
    this.request<void, SidoRes[]>({
      method: "get",
      url: `/waiting/sido`,
      ...requestConfig,
    });
  }
  getAgeList(requestConfig: RequestConfig<AgeRes[]>): void {
    this.request<void, AgeRes[]>({
      method: "get",
      url: `/waiting/age`,
      ...requestConfig,
    });
  }
  makeNewRoom(waitingRoomMakeReq: WaitingRoomMakeReq, requestConfig: RequestConfig<RequestEnterRoomRes>): void {
    this.request<WaitingRoomMakeReq, RequestEnterRoomRes>({
      method: "post",
      url: `/waiting/create`,
      data: waitingRoomMakeReq,
      ...requestConfig,
    });
  }
  startPickAvatar(startPickAvatarReq: StartPickAvatarReq, requestConfig: RequestConfig<void>): void {
    this.request<StartPickAvatarReq, void>({
      method: "patch",
      url: `/waiting/start`,
      data: startPickAvatarReq,
      ...requestConfig,
    });
  }
  requestEnterRoom(requestEnterRoomReq: RequestEnterRoomReq, requestConfig: RequestConfig<RequestEnterRoomRes>): void {
    this.request<RequestEnterRoomReq, RequestEnterRoomRes>({
      method: "post",
      url: `/waiting/state`,
      data: requestEnterRoomReq,
      ...requestConfig,
    });
  }

  // Chat API ===========================================================
  sendMessage(chatMessageReq: ChatMessageReq, requestConfig: RequestConfig<void>) {
    this.request<ChatMessageReq, void>({
      method: "post",
      url: `/chatting/send`,
      data: chatMessageReq,
      ...requestConfig,
    });
  }

  // Session API =========================================================
  getMeetingRoomInfo(meetingRoomInfoReq: MeetingRoomInfoReq, requestConfig: RequestConfig<MeetingRoomInfoRes>) {
    this.request<MeetingRoomInfoReq, MeetingRoomInfoRes>({
      method: "get",
      url: `/meeting/${meetingRoomInfoReq.meetingroom_id}`,
      ...requestConfig,
    });
  }
  patchFinalPick(finalPickReq: FinalPickReq, requestConfig: RequestConfig<FinalPickRes>) {
    this.request<FinalPickReq, FinalPickRes>({
      method: "patch",
      url: `/meeting/pick`,
      data: finalPickReq,
      ...requestConfig,
    });
  }
  getFinalPickResult(finalPickResultReq: FinalPickResultReq, requestConfig: RequestConfig<FinalPickResultRes>) {
    this.request<FinalPickResultReq, FinalPickResultRes>({
      method: "get",
      url: `/meeting/pick/result/${finalPickResultReq.meetingroom_id}/${finalPickResultReq.user_id}`,
      ...requestConfig,
    });
  }
  postStartFinalPick(startFinalPickReq: StartFinalPickReq, requestConfig: RequestConfig<void>): void {
    this.request<StartFinalPickReq, void>({
      method: "post",
      url: `/meeting/pick/start`,
      data: startFinalPickReq,
      ...requestConfig,
    });
  }

  static getInstance(): AvatimeApi {
    return this.instance || (this.instance = new this());
  }

  login(newToken: string) {
    this.axiosInstance = this.createAxiosInstance(newToken);
  }

  logout() {
    this.axiosInstance = this.createAxiosInstance();
  }

  private async request<P, R>(config: Config<P, R>) {
    const request = async () => {
      try {
        const res: R = (
          await this.axiosInstance.request({
            method: config.method,
            url: config.url,
            data: config.data,
          })
        ).data;

        if (config.onSuccess) {
          config.onSuccess(res);
        }
      } catch (error: any) {
        const status = error.response.status;

        switch (status) {
          case 401:
            localStorage.removeItem("token");
            alert("로그인이 필요해요 ㅠ ㅠ");
            config.navigate("/login", { replace: true });
            return;
          case 500 <= status:
            alert("서버에서 알 수 없는 에러가 발생했어요 ㅠ");
            console.log(error);
            return;
        }

        if (config.onFailure) {
          config.onFailure(error);
        }
      }
    };

    request();
  }

  private createAxiosInstance = (token?: string) => {
    const headers: any = {
      "content-type": "application/json",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    } else if (localStorage.getItem("token")) {
      headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    }

    return axios.create({
      baseURL: API_BASE_URL,
      timeout: 1000,
      headers,
    });
  };
}
