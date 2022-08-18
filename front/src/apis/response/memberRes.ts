export interface ProfileRes {
    id : number;
    image_path: string;
    name: string;
}

export interface RegisterRes {
    user_id : number;
    social_id : string;
    social_type : number;
    gender : string;
    profile_image_path: string;
    name: string;
    description: string;
    accessToken: string;
}

export interface UserInfoRes {
    name: string;
    gender: string;
    description: string;
    profile_image_path: string;
}

export interface UserModifyRes {
    statusCode: number;
    message: string;
}