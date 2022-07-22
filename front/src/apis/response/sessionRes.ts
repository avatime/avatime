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