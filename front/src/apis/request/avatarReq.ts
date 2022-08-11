export interface SelectAvatarReq {
    meetingroom_id: number,
    user_id: number,
    avatar_id: number,
}

export interface AvatarNameCheckReq {
    name: string,
}

export interface SaveAvatarReq {
    name: string,
    user_id: number,
    number: number,
}

export interface GetAvatarReq {
    user_id : number,
}

export interface ModifyAvatarReq {
    id: number,
    name: string,
}

