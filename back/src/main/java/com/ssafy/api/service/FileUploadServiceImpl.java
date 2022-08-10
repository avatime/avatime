package com.ssafy.api.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.api.dto.FileDetail;
import com.ssafy.api.request.AvatarCustomReq;
import com.ssafy.api.service.storage.AmazonS3ResourceStorage;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FileUploadServiceImpl implements FileUploadService {

	private final AmazonS3ResourceStorage amazonS3ResourceStorage;
	@Override
	public FileDetail save(AvatarCustomReq avatarCustomReq) {
		// TODO Auto-generated method stub
		FileDetail fileDetail = FileDetail.multipartOf(avatarCustomReq);
		MultipartFile multipartFile = avatarCustomReq.getImage();
        amazonS3ResourceStorage.store(fileDetail.getPath(), multipartFile);
        return fileDetail;
	}
}
