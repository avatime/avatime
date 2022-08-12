package com.ssafy.api.service;

import org.springframework.web.multipart.MultipartFile;

import com.ssafy.api.dto.FileDetail;

public interface FileUploadService {
	public FileDetail save(MultipartFile multipartFile);
	public String save2(MultipartFile multipartFile);
	public void saveAvatar(String base64) throws Exception;
}
