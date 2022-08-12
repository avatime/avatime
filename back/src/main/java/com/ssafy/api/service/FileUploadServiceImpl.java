package com.ssafy.api.service;

import java.io.File;
import java.util.Base64;

import javax.imageio.ImageIO;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.api.dto.FileDetail;
import com.ssafy.api.service.storage.AmazonS3ResourceStorage;
import com.ssafy.common.util.MultipartUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FileUploadServiceImpl implements FileUploadService {

	private final AmazonS3ResourceStorage amazonS3ResourceStorage;
	@Override
	public FileDetail save(MultipartFile multipartFile) {
		// TODO Auto-generated method stub
		FileDetail fileDetail = FileDetail.multipartOf(multipartFile);
        amazonS3ResourceStorage.store(fileDetail.getPath(), multipartFile);
        return fileDetail;
	}
	@Override
	public String save2(MultipartFile multipartFile) {
		// TODO Auto-generated method stub
		String filepath = MultipartUtil.createPath(MultipartUtil.createFileId(), multipartFile.getContentType());
		amazonS3ResourceStorage.store(filepath, multipartFile);
		return filepath;
	}
	@Override
	public void saveAvatar(String base64) throws Exception {
		// TODO Auto-generated method stub
		File file = new File(MultipartUtil.getLocalHomeDirectory(), MultipartUtil.createPath(MultipartUtil.createFileId(), "png"));
		byte[] decodedBytes = Base64.getDecoder().decode(base64.split(",")[1]);
		
		String fullPath = MultipartUtil.getLocalHomeDirectory();
		amazonS3ResourceStorage.storeAvatar(fullPath, file);
	}
}
