export interface WaitingRoomInfoRes {
  [index: string]: any;
  id: number;
  name: string;
  cnt_man: number;
  cnt_woman: number;
  head_count: number;
  age: string;
  sido: string;
  created_time: string;
  status: number;
}

export interface WaitingUser {
  id: number;
  type: number;
  name: string;
  gender: string;
  profile_img_path: string;
}

export interface WaitingRoomEnterRes {
  name: string; //=username
  type: number;
  room_id: number;
}

export interface SidoRes {
  id: number;
  name: string;
}

export interface AgeRes {
  id: number;
  name: string;
}

export interface RequestEnterRoomRes {
  chatting_room_id: number;
  waiting_room_id : number;
}