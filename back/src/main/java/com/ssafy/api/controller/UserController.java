package com.ssafy.api.controller;

import java.util.List;

import org.omg.CORBA.UserException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.api.request.UserUpdatePostReq;
import com.ssafy.api.response.UserRes;
import com.ssafy.api.service.ProfileService;
import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
//import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Profile;
import com.ssafy.db.entity.User;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import springfox.documentation.annotations.ApiIgnore;

/**
 * 유저 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "유저 API", tags = {"User"})
@RestController
@RequestMapping("/api/v1/user")
public class UserController {
	
	@Autowired
	ProfileService profileService;
	
	@Autowired
	UserService userService;

	// 프로필 사진 목록 조회
	@GetMapping("/profile")
	@ApiOperation(value = "프로필 이미지 목록 조회", notes = "서버 내 모든 프로필 이미지 제공")
	public ResponseEntity<?> profileAll(){
		try {
			List<Profile> profileList = profileService.getProfileAll();
			return new ResponseEntity<List<Profile>>(profileList, HttpStatus.OK);
		} catch (Exception e) {
			return ResponseEntity.status(500).body(e);
		}
	}
	
	// 프로필 단일 사진 조회
	@GetMapping("/profile/{profileId}")
	public ResponseEntity<?> profile(@PathVariable Long profileId){
		
		try {
			Profile profile = profileService.getProfile(profileId);
			if (profile != null) {
				return ResponseEntity.status(200).body(profile);
			}else {
				return ResponseEntity.status(404).body(null);
			}
		} catch (Exception e) {
			return ResponseEntity.status(500).body(e);
		}
	}
	// 유저 정보 조회
	@GetMapping("/{userId}")
	public ResponseEntity<?> getUserInfo(@PathVariable Long userId){
		try {
			User user = userService.getUserByUserId(userId);
			if (user != null) {
				return ResponseEntity.status(201).body(user);
			}else {
				return ResponseEntity.status(404).body(null);
			}
		} catch (Exception e) {
			return ResponseEntity.status(500).body(e);
		}
	}
	
	// 유저 정보 수정
	@PatchMapping("/{id}")
	public ResponseEntity<?> modifyUserInfo(@PathVariable Long id, @RequestBody UserUpdatePostReq updateInfo){
		try {
			userService.updateUserInfo(id, updateInfo);
			return ResponseEntity.status(200).body("");
		} catch (Exception e) {
			return ResponseEntity.status(500).body(e);
		}
	}
	
	// 유저 정보 삭제
	@DeleteMapping("/{userId}")
	public ResponseEntity<?> deleteUserInfo(@PathVariable Long userId){
		try {
			userService.deleteUserInfo(userId);
			return ResponseEntity.status(204).body(BaseResponseBody.of(204, "회원 정보를 삭제했습니다."));
		} catch (Exception e) {
			return ResponseEntity.status(500).body(e);
		}
	}
}
