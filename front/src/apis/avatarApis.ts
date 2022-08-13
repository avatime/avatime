import { SelectAvatarReq, AvatarNameCheckReq, GetAvatarReq, GetAvatarAllReq, SaveAvatarReq } from './request/avatarReq';
import { GetAvatarRes, SaveAvatarRes } from "./response/avatarRes";
import { SuccessRes } from "./response/successRes";
import { RequestConfig } from './avatimeApi';

export interface AvatarApi {
  pickAvatar(selectAvatarReq: SelectAvatarReq, requestConfig: RequestConfig<SuccessRes>): Promise<void>;
  checkAvatarName(avatarNameCheckReq: AvatarNameCheckReq, requestConfig: RequestConfig<boolean>): Promise<void>;
  getAvatarList(getAvatarAllReq :GetAvatarAllReq, requestConfig: RequestConfig<GetAvatarRes[]>): Promise<void>;
  saveAvatar(saveAvatarReq: SaveAvatarReq, requestConfig: RequestConfig<SaveAvatarRes>): Promise<void>;
  getAvatar(getAvatarReq: GetAvatarReq, requestConfig: RequestConfig<GetAvatarRes>): Promise<void>;
}