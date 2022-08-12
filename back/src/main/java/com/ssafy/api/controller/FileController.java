package com.ssafy.api.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ssafy.api.request.AvatarCustomReq;
import com.ssafy.api.response.CustomAvatarRes;
import com.ssafy.api.service.AvatarService;
import com.ssafy.api.service.FileUploadService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Avatar;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;

/**
 * 파일 업로드 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "파일 업로드 관련 API", tags = { "File." })
@RestController
@RequestMapping("/api/v1/avatar")
public class FileController {

	@Autowired
	FileUploadService fileUploadService;
	
	@Autowired
	AvatarService avatarService;

	@PostMapping("/custom")
	@ApiOperation(value = "커스텀 아바타 저장", notes = "")
	@ApiResponses({
        @ApiResponse(code = 200, message = "성공", response = BaseResponseBody.class),
        @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
	public ResponseEntity<?> customAvatarUpload(@RequestBody AvatarCustomReq avatarCustomReq) {
		try {
			Avatar avatar = avatarService.findByUserIdAndSlot(avatarCustomReq.getUser_id(), avatarCustomReq.getSlot());
			avatar.setName(avatarCustomReq.getName());
			avatar.setUserId(avatarCustomReq.getUser_id());
			avatar.setImagePath(fileUploadService.saveAvatar(avatarCustomReq));
			avatar.setSlot(avatarCustomReq.getSlot());
			avatarService.saveAvatar(avatar);
			return ResponseEntity.status(200).body("성공");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			return ResponseEntity.status(500).body("실패: 관리자에게 문의하세요");
		}
	}

	@GetMapping("/load/{user_id}")
	@ApiOperation(value = "커스텀 아바타 불러오기", notes = "")
	@ApiResponses({
        @ApiResponse(code = 200, message = "성공", response = CustomAvatarRes.class),
        @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
	public ResponseEntity<?> getUserCustom(@PathVariable Long user_id) {
		String address = "https://avatimebucket2022.s3.ap-northeast-2.amazonaws.com/";
		List<CustomAvatarRes> list = new ArrayList<>();
		try {
			List<Avatar> avatarlist = avatarService.findAllByUserId(user_id);
			for(Avatar avatar : avatarlist) {
				CustomAvatarRes custom = CustomAvatarRes.builder()
						.id(avatar.getId())
						.name(avatar.getName())
						.slot(avatar.getSlot())
						.path(address + avatar.getImagePath())
						.base64("data:image/png;base64," + fileUploadService.getAvatarByBase64(avatar.getImagePath()))
						.build();
				list.add(custom);
			}
			return ResponseEntity.status(200).body(list);
		} catch(Exception e) {
			return ResponseEntity.status(500).body("실패: 관리자에게 문의하세요");
		}
	}
}
