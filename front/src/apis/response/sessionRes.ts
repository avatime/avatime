export interface SessionUserListRes {
    userList: Array<SessionUser>
}

export interface SessionUser {
    userId: number;
    userName: string;
    avatarId: number;
    avatarName: string;
    avatarImagePath: string;
}

export interface FinalPickResultRes {
    matched: boolean;
    meetingRoomId: number;
    resultList: PickResult[];
}

export interface PickResult {
    userId: number;
    userName: string;
    gender: string;
    avatarId: number;
    avatarName: string;
    avatarImagePath: string;
    pickUserId: number;
}