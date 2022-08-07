export interface MeetingRoomInfoRes {
  created_time: string;
  chattingroom_id: number;
  men_chattingroom_id: number;
  women_chattingroom_id: number;
  meeting_user_info_list: MeetingUserInfoRes[];
}

export interface MeetingUserInfoRes {
  user_id: number;
  user_name: string;
  avatar_id: number;
  avatar_image_path: string;
  avatar_name: string;
  gender: string;
}

export interface FinalPickRes {
  meetingroom_id: number;
  user_id: number;
  pick_user_id: number;
}

export interface FinalPickResultRes {
  matched: boolean;
  meetingroom_id: number;
  result_list: PickResultRes[];
}

export interface PickResultRes {
  id: number;
  name: string;
  gender: string;
  avatar_id: number;
  avatar_name: string;
  avatar_image_path: string;
  pick_user_id: number;
}

