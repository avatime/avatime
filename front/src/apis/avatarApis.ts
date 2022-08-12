import { SelectAvatarReq, AvatarNameCheckReq, GetAvatarReq, SaveAvatarReq, ModifyAvatarReq } from './request/avatarReq';
import { GetAvatarRes } from "./response/avatarRes";
import { SuccessRes } from "./response/successRes";
import { RequestConfig } from './avatimeApi';

export interface AvatarApi {
  pickAvatar(selectAvatarReq: SelectAvatarReq, requestConfig: RequestConfig<SuccessRes>): void;
  checkAvatarName(avatarNameCheckReq: AvatarNameCheckReq, requestConfig: RequestConfig<boolean>): void;
  getAvatarList(getAvatarReq :GetAvatarReq, requestConfig: RequestConfig<GetAvatarRes[]>): void;
  saveAvatar(saveAvatarReq: SaveAvatarReq, requestConfig: RequestConfig<boolean>): void;
}