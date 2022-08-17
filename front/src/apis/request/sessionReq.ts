export interface MeetingRoomInfoReq {
  meetingroom_id: number;
}

export interface FinalPickReq {
  meetingroom_id: number;
  user_id: number;
  pick_user_id: number;
}

export interface FinalPickResultReq {
  meetingroom_id: number;
  user_id: number;
}

export interface StartFinalPickReq {
  meetingroom_id: number;
}

export interface StartBalanceGameReq {
  meetingroom_id: number;
}

export interface PostBalanceGameReq {
  meetingroom_id: number;
  balance_id: number;
  user_id: number;
  result: boolean;
}

export interface StartPickStuffReq {
  meetingroom_id: number;
}

export interface PatchPickStuffReq {
  meetingroom_id: number;
  user_id: number;
  stuff_id: number;
}

export interface PostLeaveMeetingReq {
  user_id: number;
  meetingroom_id: number;
}