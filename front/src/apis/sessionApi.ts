import {
  FinalPickReq,
  FinalPickResultReq,
  MeetingRoomInfoReq,
  PostBalanceGameReq,
  StartFinalPickReq,
} from "./request/sessionReq";
import { RequestConfig } from "./avatimeApi";
import { MeetingRoomInfoRes, FinalPickRes, FinalPickResultRes } from "./response/sessionRes";
import { StartBalanceGameReq } from "./request/sessionReq";

export interface SessionApi {
  getMeetingRoomInfo(
    meetingRoomInfoReq: MeetingRoomInfoReq,
    requestConfig: RequestConfig<MeetingRoomInfoRes>
  ): Promise<void>;
  patchFinalPick(
    finalPickReq: FinalPickReq,
    requestConfig: RequestConfig<FinalPickRes>
  ): Promise<void>;
  getFinalPickResult(
    finalPickResultReq: FinalPickResultReq,
    requestConfig: RequestConfig<FinalPickResultRes>
  ): Promise<void>;
  postStartFinalPick(
    startFinalPickReq: StartFinalPickReq,
    requestConfig: RequestConfig<void>
  ): Promise<void>;
  postStartBalanceGame(
    startBalanceGameReq: StartBalanceGameReq,
    requestConfig: RequestConfig<void>
  ): Promise<void>;
  postResultBalanceGame(
    postBalanceGameReq: PostBalanceGameReq,
    requestConfig: RequestConfig<void>
  ): Promise<void>;
}
