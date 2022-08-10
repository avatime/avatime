package com.ssafy.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.api.dto.FileDetail;
import com.ssafy.api.request.AvatarCustomReq;
import com.ssafy.api.service.FileUploadService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

/**
 * 파일 업로드 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "파일 업로드 관련 API", tags = { "File." })
@RestController
@RequestMapping("/api/v1/avatar")
public class FileController {

	@Autowired
	FileUploadService fileUploadService;
//	@PostMapping("/custom")
//	@ApiOperation(value = "커스텀 아바타 저장", notes = "")
//	@ApiResponses({ @ApiResponse(code = 200, message = "성공", response = BaseResponseBody.class),
//			@ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class) })
//	public ResponseEntity<?> AvatarCustomUpload(
//			@RequestBody @ApiParam(value = "커스텀 아바타 정보", required = true) AvatarCustomReq avatarCustomReq)
//			throws Exception {
//		try {
//			Avatar avatar = new Avatar();
//			avatar.setName(avatarCustomReq.getAvatar_name());
//			avatar.setUserId(avatarCustomReq.getUser_id());
//			Path currentPath = Paths.get("");
//	        String path = currentPath.toAbsolutePath().toString();
//
//			System.out.println(avatarCustomReq.getImage_code());
//			return ResponseEntity.status(201).body(decoder(avatarCustomReq)?path:path);
//		} catch (Exception e) {
//			return ResponseEntity.status(500).body("서버 오류");
//		}
//	}

	@PostMapping("/custom")
	@ApiOperation(value = "커스텀 아바타 저장", notes = "")
	public ResponseEntity<?> post(AvatarCustomReq avatarCustomReq) {
		FileDetail fileDetail = fileUploadService.save(avatarCustomReq);
		return ResponseEntity.status(201).body("사진 올리기 성공!!!!!! >> " + fileDetail.getPath());
	}

}
