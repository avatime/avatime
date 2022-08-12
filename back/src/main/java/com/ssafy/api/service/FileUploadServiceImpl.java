package com.ssafy.api.service;

import java.util.Base64;

import org.springframework.stereotype.Service;

import com.ssafy.api.request.AvatarCustomReq;
import com.ssafy.api.service.storage.AmazonS3ResourceStorage;
import com.ssafy.common.util.MultipartUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FileUploadServiceImpl implements FileUploadService {

	private final AmazonS3ResourceStorage amazonS3ResourceStorage;

	@Override
	public String saveAvatar(AvatarCustomReq avatarCustomReq) throws Exception {
		// TODO Auto-generated method stub
		byte[] decodedBytes = Base64.getDecoder().decode(avatarCustomReq.getBase64().split(",")[1]);
		
		String fullPath = MultipartUtil.createPath(MultipartUtil.createFileId(), "png");
//		String fullPath = MultipartUtil.createPath(avatarCustomReq.getAvatar_name(), "png");
		amazonS3ResourceStorage.storeAvatar(fullPath, decodedBytes);
		
		return fullPath;
	}

	@Override
	public String getAvatarByBase64(String imagePath) throws Exception {
		// TODO Auto-generated method stub
		return amazonS3ResourceStorage.getImageByBase64(imagePath);
	}
}
