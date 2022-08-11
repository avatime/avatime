import { SelectAvatarReq, AvatarNameCheckReq, GetAvatarReq, SaveAvatarReq, ModifyAvatarReq } from './request/avatarReq';
import { GetAvatarRes } from "./response/avatarRes";
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

interface AvatarNameCheckApi {
    checkAvatarName(avatarNameCheckReq: AvatarNameCheckReq): Promise<boolean>;
  }
  
  const avatarNameCheckApi: AvatarNameCheckApi = {
    checkAvatarName: async function (avatarNameCheckReq: AvatarNameCheckReq): Promise<boolean> {
      return (await axiosInstance.get(`/auth/check/${avatarNameCheckReq.name}`)).data;
    },
  };

interface GetAvatarApi {
  receive(getAvatarReq :GetAvatarReq): Promise<GetAvatarRes[]>;
}

const getAvatarApi: GetAvatarApi = {
  receive: async function (getAvatarReq: GetAvatarReq): Promise<GetAvatarRes[]> {
    return (await axiosInstance.get(`/api/v1/avatar/load/${getAvatarReq.user_id}`)).data;
  },
};

interface SaveAvatarApi {
  saveAvatar(saveAvatarReq: SaveAvatarReq): Promise<boolean>;
}

const saveAvatarApi: SaveAvatarApi = {
  saveAvatar: async function (saveAvatarReq: SaveAvatarReq): Promise<boolean> {
    return (await axiosInstance.post(`/api/v1/avatar/custom`, saveAvatarReq)).data;
  }
}

interface ModifyAvatarApi {
  modifyAvatar(modifyAvatarReq: ModifyAvatarReq): Promise<boolean>;
}

const modifyAvatarApi: ModifyAvatarApi = {
  modifyAvatar: async function (modifyAvatarReq: ModifyAvatarReq): Promise<boolean> {
    return (await axiosInstance.patch(`/api/v1/avatar/modify/${modifyAvatarReq.id}`, modifyAvatarReq)).data;
  }
}

export {selectAvatarApi, avatarNameCheckApi, getAvatarApi, saveAvatarApi, modifyAvatarApi}