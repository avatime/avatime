package com.ssafy.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.api.dto.FileDetail;
import com.ssafy.api.request.AvatarCustomReq;
import com.ssafy.api.service.AvatarService;
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
	AvatarService avatarService;
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
	
	@PostMapping("/customTest")
	@ApiOperation(value = "커스텀 아바타 저장", notes = "")
	public ResponseEntity<?> avatarUpload(@RequestPart("file") MultipartFile multipartFile) {
		FileDetail fileDetail = fileUploadService.save(multipartFile);
//		String filepath = fileUploadService.save2(multipartFile);
		return ResponseEntity.status(201).body("사진 올리기 성공!!!!!! >> ");
	}

	@PostMapping("/custom")
	@ApiOperation(value = "커스텀 아바타 저장", notes = "")
//	public ResponseEntity<?> post(@RequestPart("file") MultipartFile multipartFile) {
//		FileDetail fileDetail = fileUploadService.save(multipartFile);
	public void post(@RequestBody AvatarCustomReq avatarCustomReq) {
		try {
			fileUploadService.saveAvatar(avatarCustomReq.getBase64());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@GetMapping("/check/{name}")
	@ApiOperation(value = "아바타 이름 중복 체크", notes = "")
	public ResponseEntity<?> checkAvatarName(@PathVariable String name){
		boolean response;
		try {
			response = avatarService.checkAvatarName(name);
		} catch (Exception e) {
			return ResponseEntity.status(500).body(e);
		}
		return ResponseEntity.ok(!response);
	}

}
