import {
  FinalPickReq,
  FinalPickResultReq,
  MeetingRoomInfoReq,
  StartFinalPickReq,
} from "./request/sessionReq";
import { RequestConfig } from "./avatimeApi";
import { MeetingRoomInfoRes, FinalPickRes, FinalPickResultRes } from './response/sessionRes';

export interface SessionApi {
  getMeetingRoomInfo(meetingRoomInfoReq: MeetingRoomInfoReq, requestConfig: RequestConfig<MeetingRoomInfoRes>): void;
  patchFinalPick(finalPickReq: FinalPickReq, requestConfig: RequestConfig<FinalPickRes>): void;
  getFinalPickResult(finalPickResultReq: FinalPickResultReq, requestConfig: RequestConfig<FinalPickResultRes>): void;
  postStartFinalPick(startFinalPickReq: StartFinalPickReq, requestConfig: RequestConfig<void>): void;
}
