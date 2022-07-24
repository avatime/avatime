package com.ssafy.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.api.response.UserRes;
import com.ssafy.api.service.ProfileService;
import com.ssafy.api.service.UserService;
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
//	
//	@PostMapping()
//	@ApiOperation(value = "회원 가입", notes = "<strong>아이디와 패스워드</strong>를 통해 회원가입 한다.") 
//    @ApiResponses({
//        @ApiResponse(code = 200, message = "성공"),
//        @ApiResponse(code = 401, message = "인증 실패"),
//        @ApiResponse(code = 404, message = "사용자 없음"),
//        @ApiResponse(code = 500, message = "서버 오류")
//    })
//	public ResponseEntity<? extends BaseResponseBody> register(
//			@RequestBody @ApiParam(value="회원가입 정보", required = true) UserRegisterPostReq registerInfo) {
//		
//		//임의로 리턴된 User 인스턴스. 현재 코드는 회원 가입 성공 여부만 판단하기 때문에 굳이 Insert 된 유저 정보를 응답하지 않음.
//		User user = userService.createUser(registerInfo);
//		
//		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
//	}
//	
//	@GetMapping("/me")
//	@ApiOperation(value = "회원 본인 정보 조회", notes = "로그인한 회원 본인의 정보를 응답한다.") 
//    @ApiResponses({
//        @ApiResponse(code = 200, message = "성공"),
//        @ApiResponse(code = 401, message = "인증 실패"),
//        @ApiResponse(code = 404, message = "사용자 없음"),
//        @ApiResponse(code = 500, message = "서버 오류")
//    })
//	public ResponseEntity<UserRes> getUserInfo(@ApiIgnore Authentication authentication) {
//		/**
//		 * 요청 헤더 액세스 토큰이 포함된 경우에만 실행되는 인증 처리이후, 리턴되는 인증 정보 객체(authentication) 통해서 요청한 유저 식별.
//		 * 액세스 토큰이 없이 요청하는 경우, 403 에러({"error": "Forbidden", "message": "Access Denied"}) 발생.
//		 */
//		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
//		String userId = userDetails.getUsername();
//		User user = userService.getUserByUserId(userId);
//		
//		return ResponseEntity.status(200).body(UserRes.of(user));
//	}
	
	@GetMapping("/profile")
	@ApiOperation(value = "프로필 이미지 목록 조회", notes = "서버 내 모든 프로필 이미지 제공")
	public ResponseEntity<List<Profile>> profile(){
		List<Profile> profileList = profileService.getProfile();
		return new ResponseEntity<List<Profile>>(profileList, HttpStatus.OK);
	
	}
	
	@GetMapping("/{userId}")
	public ResponseEntity<?> getUserInfo(@PathVariable Long userId){
		User user = userService.getUserByUserId(userId);
		if (user != null) {
			return ResponseEntity.status(201).body(user);
		}else {
			return ResponseEntity.status(404).body(null);
		}
		
	}

}
