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
