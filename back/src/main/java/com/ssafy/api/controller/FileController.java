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
import com.ssafy.api.response.CustomAvatarUploadRes;
import com.ssafy.api.response.entity.AvatarStatus;
import com.ssafy.api.service.AvatarService;
import com.ssafy.api.service.FileUploadService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Avatar;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

/**
 * 파일 업로드 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "파일 업로드 관련 API", tags = { "File." })
@RestController
@RequestMapping("/api/v1/avatar")
public class FileController {
	private final String address = "https://avatimebucket2022.s3.ap-northeast-2.amazonaws.com/";

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
			avatar.setPicPath(fileUploadService.savePicInfo(avatarCustomReq));
			avatar.setImagePath(address + fileUploadService.saveAvatar(avatarCustomReq));
			avatar.setSlot(avatarCustomReq.getSlot());
			avatar = avatarService.saveAvatar(avatar);
			CustomAvatarUploadRes customAvatarUploadRes = new CustomAvatarUploadRes();
			customAvatarUploadRes.setId(avatar.getId());
			customAvatarUploadRes.setPath(avatar.getImagePath());
			return ResponseEntity.status(200).body(customAvatarUploadRes);
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
		CustomAvatarRes[] list = new CustomAvatarRes[4];
		try {
			List<Avatar> avatarlist = avatarService.findAllByUserId(user_id);
			for(Avatar avatar : avatarlist) {
				CustomAvatarRes custom = CustomAvatarRes.builder()
						.id(avatar.getId())
						.name(avatar.getName())
						.slot(avatar.getSlot())
						.path(avatar.getImagePath())
						.base64("data:image/png;base64," + fileUploadService.getAvatarByBase64(avatar.getImagePath().replace(address, "")))
						.pic_info(fileUploadService.getPicInfo(avatar.getPicPath()))
						.build();
				list[avatar.getSlot().intValue() - 1] = custom;
			}
			return ResponseEntity.status(200).body(list);
		} catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(500).body("실패: 관리자에게 문의하세요");
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

	@GetMapping("/{user_id}")
	@ApiOperation(value = "커스텀 아바타 불러오기", notes = "")
	@ApiResponses({
        @ApiResponse(code = 200, message = "성공", response = Avatar.class),
        @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
	public ResponseEntity<?> getUserAvatarCustom(@PathVariable Long user_id) {
		List<AvatarStatus> list = new ArrayList<>();
		try {
			List<Avatar> avatarlist = avatarService.findAllByUserId(user_id);
			for(Avatar avatar : avatarlist) {
				list.add(new AvatarStatus(avatar));
			}
			return ResponseEntity.status(200).body(list);
		} catch(Exception e) {
			return ResponseEntity.status(500).body("실패: 관리자에게 문의하세요");
		}
	}
}
