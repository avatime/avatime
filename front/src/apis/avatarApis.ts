import { SelectAvatarReq } from "./request/avatarReq";
import { SuccessRes } from "./response/successRes";
import { axiosInstance } from './axiosInstance';

//아바타 선택------------------------------------------------------------------
interface SelectAvatarApi {
    pickAvatar(selectAvatarReq: SelectAvatarReq): Promise<SuccessRes>;
}

const selectAvatarApi:SelectAvatarApi = {
    pickAvatar: async function (selectAvatarReq: SelectAvatarReq) : Promise<SuccessRes> {
        return (await axiosInstance.patch(`/meeting/selectAvatar`, selectAvatarReq)).data;
    }
}

export {selectAvatarApi}