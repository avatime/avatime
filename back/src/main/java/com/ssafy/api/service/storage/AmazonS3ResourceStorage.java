package com.ssafy.api.service.storage;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.Base64;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;

import lombok.RequiredArgsConstructor;

@Component
@ConditionalOnProperty(prefix = "cloud.aws.s3", name = "bucket")
@RequiredArgsConstructor
public class AmazonS3ResourceStorage {
	@Value("${cloud.aws.s3.bucket}")
	private String bucket;
	private final AmazonS3Client amazonS3Client;

	public void storeAvatar(String fullPath, byte[] base64) {
		try {
			InputStream image = new ByteArrayInputStream(base64);
			ObjectMetadata metadata = new ObjectMetadata();
			metadata.setContentLength(image.available());
			metadata.setContentType(org.springframework.http.MediaType.IMAGE_PNG_VALUE);
			amazonS3Client.putObject(new PutObjectRequest(bucket, fullPath, image, metadata)
					.withCannedAcl(CannedAccessControlList.PublicRead));
		} catch (Exception e) {
			throw new RuntimeException();
		}
	}

	/**
	 * amazon server 이미지 삭제
	 * 
	 * @param imagePath: key
	 */
	public void deleteAvatar(String imagePath) {
		try {
			amazonS3Client.deleteObject(new DeleteObjectRequest(bucket, imagePath));
		} catch (Exception e) {
			throw new RuntimeException();
		}
	}

	public String getImageByBase64(String imagePath) {

		try {
			S3Object object = amazonS3Client.getObject(new GetObjectRequest(bucket, imagePath));
			S3ObjectInputStream objectInputStream = object.getObjectContent();
			byte[] base64 = IOUtils.toByteArray(objectInputStream);

			return Base64.getEncoder().encodeToString(base64);
		} catch (Exception e) {
			throw new RuntimeException();
		}
	}
}