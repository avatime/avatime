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