export interface AvatarInfoRes {
  id: number;
  name: string;
  image_path: string;
  selected: boolean;
}

export interface AvatarPickInfoRes {
  status: number;
  avatar_list: Array<AvatarInfoRes>;
}

export interface GetAvatarRes {
  id: number;
  name: string;
  path: string;
  base64: string;
  slot: number;
  pic_info: string;
}

export interface SaveAvatarRes {
  id: number;
  path: string;
}
