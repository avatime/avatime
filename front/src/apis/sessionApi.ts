import {
  FinalPickReq,
  FinalPickResultReq,
  MeetingRoomInfoReq,
  StartFinalPickReq,
  RegisterStreamReq,
} from "./request/sessionReq";
import { MeetingRoomInfoRes, FinalPickResultRes, MeetingUserInfoRes } from "./response/sessionRes";
import { axiosInstance } from "./axiosInstance";

interface SessionApi {
  getMeetingRoomInfo(meetingRoomInfoReq: MeetingRoomInfoReq): Promise<MeetingRoomInfoRes>;
  patchFinalPick(finalPickReq: FinalPickReq): Promise<void>;
  getFinalPickResult(finalPickResultReq: FinalPickResultReq): Promise<FinalPickResultRes>;
  postStartFinalPick(startFinalPickReq: StartFinalPickReq): Promise<void>;
  patchRegisterStreamId(registerStreamReq: RegisterStreamReq): Promise<void>;
}

const sessionApi: SessionApi = {
  getMeetingRoomInfo: async function (
    meetingRoomInfoReq: MeetingRoomInfoReq
  ): Promise<MeetingRoomInfoRes> {
    return (await axiosInstance.get(`/meeting/${meetingRoomInfoReq.meetingroom_id}`)).data;
  },
  patchFinalPick: async function (finalPickReq: FinalPickReq): Promise<void> {
    return (await axiosInstance.patch(`/meeting/pick`, finalPickReq)).data;
  },
  getFinalPickResult: async function (
    finalPickResultReq: FinalPickResultReq
  ): Promise<FinalPickResultRes> {
    return (await axiosInstance.get(`/meeting/pick/result/${finalPickResultReq.meetingroom_id}`))
      .data;
  },
  postStartFinalPick: async function (startFinalPickReq: StartFinalPickReq): Promise<void> {
    return (await axiosInstance.post(`/meeting/pick/start`, startFinalPickReq)).data;
  },
  patchRegisterStreamId: async function (registerStreamReq: RegisterStreamReq): Promise<void> {
    return (await axiosInstance.patch(`/meeting/registerStream`, registerStreamReq)).data;
  },
};

export default sessionApi;
