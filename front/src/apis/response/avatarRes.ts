export interface AvatarInfoRes {
    id: number;
    name :string;
    image_path: string;
    selected  :boolean;
    
}

export interface AvatarPickInfoRes {
    status: number;
    avatar_list : Array<AvatarInfoRes>;
}
