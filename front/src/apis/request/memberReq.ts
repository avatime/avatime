export interface NameCheckReq {
    name: string;
}

export interface RegisterReq {
    social_id : string;
    social_type : number;
    gender : string;
    name : string;
    profile_image_path : string;
    description : string;
}

export interface UserInfoReq {
    user_id: number;
}

export interface UserModifyReq {
    id : number;
    name: string;
    profile_image_path : string;
    description: string;
}