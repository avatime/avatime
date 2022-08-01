import axios from "axios";
import { SelectAvatarReq } from "./request/avatarPickReq";
import { SuccessRes } from "./response/successRes";

const BASE_URL: string = "http://localhost:8080/api/v1";

//아바타 선택------------------------------------------------------------------
interface SelectAvatarApi {
    pickAvatar(selectAvatarReq: SelectAvatarReq): Promise<SuccessRes>;
}

const selectAvatarApi:SelectAvatarApi = {
    pickAvatar: async function (selectAvatarReq: SelectAvatarReq) : Promise<SuccessRes> {
        return (await (await axios.patch(`${BASE_URL}/meeting/selectAvatar`, selectAvatarReq)).data);
    }
}

export {selectAvatarApi}