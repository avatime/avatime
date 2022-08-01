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
export interface WaitingUserListRes {
  userList: Array<WaitingUser>;
}

export interface WaitingUser {
  userId: number;
  userName: string;
  avatarId: number;
  avatarName: string;
  avatarImagePath: string;
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
