package com.ssafy.api.service;

import com.ssafy.api.dto.FileDetail;
import com.ssafy.api.request.AvatarCustomReq;

public interface FileUploadService {
	public FileDetail save(AvatarCustomReq avatarCustomReq);
}
