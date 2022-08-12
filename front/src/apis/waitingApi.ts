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
  getSidoList(requestConfig: RequestConfig<SidoRes[]>): void;
  getAgeList(requestConfig: RequestConfig<AgeRes[]>): void;
  makeNewRoom(waitingRoomMakeReq: WaitingRoomMakeReq, requestConfig: RequestConfig<RequestEnterRoomRes>): void;
  startPickAvatar(startPickAvatarReq: StartPickAvatarReq, requestConfig: RequestConfig<void>): void;
  requestEnterRoom(requestEnterRoomReq: RequestEnterRoomReq, requestConfig: RequestConfig<RequestEnterRoomRes>): void;
}
