import axios, { AxiosInstance, Method } from "axios";
import { API_BASE_URL } from "./url";
import { SessionApi } from "./sessionApi";
import {
  MeetingRoomInfoReq,
  FinalPickReq,
  FinalPickResultReq,
  StartFinalPickReq,
  StartBalanceGameReq,
  PostBalanceGameReq,
  PatchPickStuffReq,
  StartPickStuffReq,
  PostLeaveMeetingReq,
} from "./request/sessionReq";
import { NavigateFunction } from "react-router";
import { ChatApi } from "./chatApi";
import { ChatMessageReq } from "./request/chatReq";
import { MeetingRoomInfoRes, FinalPickResultRes, FinalPickRes } from "./response/sessionRes";
import { WaitingApi } from "./waitingApi";
import {
  WaitingRoomMakeReq,
  StartPickAvatarReq,
  RequestEnterRoomReq,
} from "./request/waitingRoomReq";
import { SidoRes, AgeRes, RequestEnterRoomRes } from "./response/waitingRoomRes";
import { UserApi } from "./userApi";
import { NameCheckReq, UserModifyReq, RegisterReq, UserInfoReq } from "./request/memberReq";
import { ProfileRes, UserModifyRes, RegisterRes, UserInfoRes } from "./response/memberRes";
import { AvatarApi } from "./avatarApis";
import {
  SelectAvatarReq,
  AvatarNameCheckReq,
  GetAvatarReq,
  GetAvatarAllReq,
  SaveAvatarReq,
} from "./request/avatarReq";
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
  async pickAvatar(
    selectAvatarReq: SelectAvatarReq,
    requestConfig: RequestConfig<SuccessRes>
  ): Promise<void> {
    await this.request<SelectAvatarReq, SuccessRes>({
      method: "patch",
      url: `/meeting/selectAvatar`,
      data: selectAvatarReq,
      ...requestConfig,
    });
  }
  async checkAvatarName(
    avatarNameCheckReq: AvatarNameCheckReq,
    requestConfig: RequestConfig<boolean>
  ): Promise<void> {
    await this.request<AvatarNameCheckReq, boolean>({
      method: "get",
      url: `/auth/check/${avatarNameCheckReq.name}`,
      ...requestConfig,
    });
  }
  async getAvatarList(
    getAvatarAllReq: GetAvatarAllReq,
    requestConfig: RequestConfig<GetAvatarRes[]>
  ): Promise<void> {
    await this.request<GetAvatarAllReq, GetAvatarRes[]>({
      method: "get",
      url: `/avatar/load/${getAvatarAllReq.user_id}`,
      ...requestConfig,
    });
  }
  async saveAvatar(
    saveAvatarReq: SaveAvatarReq,
    requestConfig: RequestConfig<SaveAvatarRes>
  ): Promise<void> {
    await this.request<SaveAvatarReq, SaveAvatarRes>({
      method: "post",
      url: `/avatar/custom`,
      data: saveAvatarReq,
      ...requestConfig,
    });
  }
  async getAvatar(
    getAvatarReq: GetAvatarReq,
    requestConfig: RequestConfig<GetAvatarRes>
  ): Promise<void> {
    await this.request<GetAvatarReq, GetAvatarRes>({
      method: "get",
      url: `/avatar/get/${getAvatarReq.user_id}/${getAvatarReq.slot}`,
      ...requestConfig,
    });
  }

  // User API ====================================================================
  async checkName(
    nameCheckReq: NameCheckReq,
    requestConfig: RequestConfig<boolean>
  ): Promise<void> {
    await this.request<NameCheckReq, boolean>({
      method: "get",
      url: `/auth/check/${nameCheckReq.name}`,
      ...requestConfig,
    });
  }
  async kakaoLogin(code: string, requestConfig: RequestConfig<any>): Promise<void> {
    await this.request<NameCheckReq, boolean>({
      method: "get",
      url: `/auth/kakao?code=${code}`,
      ...requestConfig,
    });
  }
  async naverLogin(code: string, state: string, requestConfig: RequestConfig<any>): Promise<void> {
    await this.request<NameCheckReq, boolean>({
      method: "get",
      url: `/auth/naver?code=${code}&state=${state}`,
      ...requestConfig,
    });
  }
  async getProfileList(requestConfig: RequestConfig<ProfileRes[]>): Promise<void> {
    await this.request<void, ProfileRes[]>({
      method: "get",
      url: `/user/profile`,
      ...requestConfig,
    });
  }
  async modifyUser(
    userModifyReq: UserModifyReq,
    requestConfig: RequestConfig<UserModifyRes>
  ): Promise<void> {
    await this.request<UserModifyReq, UserModifyRes>({
      method: "patch",
      url: `/user/${userModifyReq.id}`,
      data: userModifyReq,
      ...requestConfig,
    });
  }
  async register(
    registerReq: RegisterReq,
    requestConfig: RequestConfig<RegisterRes>
  ): Promise<void> {
    await this.request<RegisterReq, RegisterRes>({
      method: "post",
      url: `/auth/register`,
      data: registerReq,
      ...requestConfig,
    });
  }
  async getUserInfo(
    userInfoReq: UserInfoReq,
    requestConfig: RequestConfig<UserInfoRes>
  ): Promise<void> {
    await this.request<UserInfoReq, UserInfoRes>({
      method: "get",
      url: `/user/${userInfoReq.user_id}`,
      ...requestConfig,
    });
  }

  // Waiting API ===========================================================
  async getSidoList(requestConfig: RequestConfig<SidoRes[]>): Promise<void> {
    await this.request<void, SidoRes[]>({
      method: "get",
      url: `/waiting/sido`,
      ...requestConfig,
    });
  }
  async getAgeList(requestConfig: RequestConfig<AgeRes[]>): Promise<void> {
    await this.request<void, AgeRes[]>({
      method: "get",
      url: `/waiting/age`,
      ...requestConfig,
    });
  }
  async makeNewRoom(
    waitingRoomMakeReq: WaitingRoomMakeReq,
    requestConfig: RequestConfig<RequestEnterRoomRes>
  ): Promise<void> {
    await this.request<WaitingRoomMakeReq, RequestEnterRoomRes>({
      method: "post",
      url: `/waiting/create`,
      data: waitingRoomMakeReq,
      ...requestConfig,
    });
  }
  async startPickAvatar(
    startPickAvatarReq: StartPickAvatarReq,
    requestConfig: RequestConfig<void>
  ): Promise<void> {
    await this.request<StartPickAvatarReq, void>({
      method: "patch",
      url: `/waiting/start`,
      data: startPickAvatarReq,
      ...requestConfig,
    });
  }
  async requestEnterRoom(
    requestEnterRoomReq: RequestEnterRoomReq,
    requestConfig: RequestConfig<RequestEnterRoomRes>
  ): Promise<void> {
    await this.request<RequestEnterRoomReq, RequestEnterRoomRes>({
      method: "post",
      url: `/waiting/state`,
      data: requestEnterRoomReq,
      ...requestConfig,
    });
  }

  // Chat API ===========================================================
  async sendMessage(
    chatMessageReq: ChatMessageReq,
    requestConfig: RequestConfig<void>
  ): Promise<void> {
    await this.request<ChatMessageReq, void>({
      method: "post",
      url: `/chatting/send`,
      data: chatMessageReq,
      ...requestConfig,
    });
  }

  // Session API =========================================================
  async getMeetingRoomInfo(
    meetingRoomInfoReq: MeetingRoomInfoReq,
    requestConfig: RequestConfig<MeetingRoomInfoRes>
  ): Promise<void> {
    await this.request<MeetingRoomInfoReq, MeetingRoomInfoRes>({
      method: "get",
      url: `/meeting/${meetingRoomInfoReq.meetingroom_id}`,
      ...requestConfig,
    });
  }
  async patchFinalPick(
    finalPickReq: FinalPickReq,
    requestConfig: RequestConfig<FinalPickRes>
  ): Promise<void> {
    await this.request<FinalPickReq, FinalPickRes>({
      method: "patch",
      url: `/meeting/pick`,
      data: finalPickReq,
      ...requestConfig,
    });
  }
  async getFinalPickResult(
    finalPickResultReq: FinalPickResultReq,
    requestConfig: RequestConfig<FinalPickResultRes>
  ): Promise<void> {
    await this.request<FinalPickResultReq, FinalPickResultRes>({
      method: "get",
      url: `/meeting/pick/result/${finalPickResultReq.meetingroom_id}/${finalPickResultReq.user_id}`,
      ...requestConfig,
    });
  }
  async postStartFinalPick(
    startFinalPickReq: StartFinalPickReq,
    requestConfig: RequestConfig<void>
  ): Promise<void> {
    await this.request<StartFinalPickReq, void>({
      method: "post",
      url: `/meeting/pick/start`,
      data: startFinalPickReq,
      ...requestConfig,
    });
  }
  async postStartBalanceGame(
    startBalanceGameReq: StartBalanceGameReq,
    requestConfig: RequestConfig<void>
  ): Promise<void> {
    await this.request<StartBalanceGameReq, void>({
      method: "post",
      url: `/meeting/balance/start`,
      data: startBalanceGameReq,
      ...requestConfig,
    });
  }
  async postResultBalanceGame(
    postBalanceGameReq: PostBalanceGameReq,
    requestConfig: RequestConfig<void>
  ): Promise<void> {
    await this.request<PostBalanceGameReq, void>({
      method: "post",
      url: `/meeting/balance/result`,
      data: postBalanceGameReq,
      ...requestConfig,
    });
  }
  async getStartPickStuff(
    startPickStuffReq: StartPickStuffReq,
    requestConfig: RequestConfig<void>
  ): Promise<void> {
    await this.request<StartPickStuffReq, void>({
      method: "get",
      url: `/meeting/stuff/start/${startPickStuffReq.meetingroom_id}`,
      ...requestConfig,
    });
  }
  async patchPickStuff(
    patchPickStuffReq: PatchPickStuffReq,
    requestConfig: RequestConfig<void>
  ): Promise<void> {
    await this.request<PatchPickStuffReq, void>({
      method: "patch",
      url: `/meeting/selectStuff`,
      data: patchPickStuffReq,
      ...requestConfig,
    });
  }
  async postLeaveMeeting(postLeaveMeetingReq: PostLeaveMeetingReq, requestConfig: RequestConfig<void>): Promise<void> {
    await this.request<PostLeaveMeetingReq, void>({
      method: "post",
      url: `/meeting/leave`,
      data: postLeaveMeetingReq,
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

    await request();
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
