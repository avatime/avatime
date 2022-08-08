package com.ssafy.api.controller;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;
import javax.xml.bind.DatatypeConverter;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.api.request.AvatarCustomReq;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Avatar;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

/**
 * 파일 업로드 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "파일 업로드 관련 API", tags = { "File." })
@RestController
@RequestMapping("/api/v1/avatar")
public class FileController {

	@PostMapping("/custom")
	@ApiOperation(value = "커스텀 아바타 저장", notes = "")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공", response = BaseResponseBody.class),
			@ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class) })
	public ResponseEntity<?> AvatarCustomUpload(
			@RequestBody @ApiParam(value = "커스텀 아바타 정보", required = true) AvatarCustomReq avatarCustomReq)
			throws Exception {
		try {
			Avatar avatar = new Avatar();
			avatar.setName(avatarCustomReq.getAvatar_name());
			avatar.setUserId(avatarCustomReq.getUser_id());

			System.out.println(avatarCustomReq.getImage_code());
			return ResponseEntity.status(201).body(decoder(avatarCustomReq)?"성공":"실패");
		} catch (Exception e) {
			return ResponseEntity.status(500).body("서버 오류");
		}
	}

	public boolean decoder(AvatarCustomReq avatarCustomReq) {

		String base64 = avatarCustomReq.getImage_code();
		String name = avatarCustomReq.getAvatar_name();
		String target = "\\home\\ubuntu\\avatar\\";
		String data = base64.split(",")[1];

		byte[] imageBytes = DatatypeConverter.parseBase64Binary(data);

		try {

			BufferedImage bufImg = ImageIO.read(new ByteArrayInputStream(imageBytes));

			ImageIO.write(bufImg, "PNG", new File(target+name+".png"));

		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();

			return false;
		}

		return true;

	}
}
