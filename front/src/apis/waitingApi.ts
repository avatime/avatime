import {
  RequestEnterRoomReq,
  WaitingRoomMakeReq,
  StartPickAvatarReq,
} from "./request/waitingRoomReq";
import {
  AgeRes,
  RequestEnterRoomRes,
  SidoRes,
} from "./response/waitingRoomRes";
import { RequestConfig } from "./avatimeApi";
//나이어린순으로 정렬
//지역 가나다 순으로 정렬
//gender -> req 변경

export interface WaitingApi {
  getSidoList(requestConfig: RequestConfig<SidoRes[]>): Promise<void>;
  getAgeList(requestConfig: RequestConfig<AgeRes[]>): Promise<void>;
  makeNewRoom(waitingRoomMakeReq: WaitingRoomMakeReq, requestConfig: RequestConfig<RequestEnterRoomRes>): Promise<void>;
  startPickAvatar(startPickAvatarReq: StartPickAvatarReq, requestConfig: RequestConfig<void>): Promise<void>;
  requestEnterRoom(requestEnterRoomReq: RequestEnterRoomReq, requestConfig: RequestConfig<RequestEnterRoomRes>): Promise<void>;
}
