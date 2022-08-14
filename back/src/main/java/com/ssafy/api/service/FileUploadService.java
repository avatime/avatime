package com.ssafy.api.service;

import com.ssafy.api.request.AvatarCustomReq;

public interface FileUploadService {
	public String saveAvatar(AvatarCustomReq avatarCustomReq) throws Exception;
	public String getAvatarByBase64(String imagePath) throws Exception;
	public String savePicInfo(AvatarCustomReq avatarCustomReq) throws Exception;
	public String getPicInfo(String picInfoPath) throws Exception;
}
