export interface WaitingRoomMakeReq {
  user_id: number;
  name: string;
  head_count: number;
  age_id: number;
  sido_id: number;
}

export interface WaitingRoomEnterReq {
  name: String; //=username
  room_id: Number;
}
export interface WaitingRoomNameReq {
  name: string;
}

export interface SidoReq {
  id: number;
  name: string;
}

export interface AgeReq {
  id: number;
  name: string;
}
