package com.ssafy.api.controller;

import java.math.BigInteger;
import java.security.SecureRandom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.yaml.snakeyaml.util.UriEncoder;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.ssafy.api.request.UserLoginPostReq;
import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.api.response.UserLoginPostRes;
import com.ssafy.api.service.UserService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.common.util.JwtTokenUtil;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.UserRepositorySupport;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.ApiResponse;

/**
 * 인증 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "인증 API", tags = {"Auth."})
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
	@Autowired
	UserService userService;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@PostMapping("/login")
	@ApiOperation(value = "로그인", notes = "<strong>아이디와 패스워드</strong>를 통해 로그인 한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공", response = UserLoginPostRes.class),
        @ApiResponse(code = 401, message = "인증 실패", response = BaseResponseBody.class),
        @ApiResponse(code = 404, message = "사용자 없음", response = BaseResponseBody.class),
        @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
	public ResponseEntity<?> login(@RequestBody @ApiParam(value="로그인 정보", required = true) UserLoginPostReq loginInfo) {
		String socialId = loginInfo.getSocialId();
		String socialType = loginInfo.getSocialType();
		
		User user = userService.getUserByUserName(socialId, socialType);
		
		// 로그인 요청한 유저가 DB에 존재하는 유저인지 확인. (존재하는 회원인지 판단)
		if(user != null) {
			// 유저가 존재하면, 로그인 성공으로 응답.(액세스 토큰을 포함하여 응답값 전달)
			// 성별 동의를 한 유저라면,
			if (user.getGender() == null) {
				return ResponseEntity.status(409).body(BaseResponseBody.of(409, "성별 제공 항목에 동의하셔야합니다."));
			}
			return ResponseEntity.ok(UserLoginPostRes.of(200, "Success", JwtTokenUtil.getToken(user.getName())));
		}
		// 존재하지 않는 유저라면 회원가입 진행
		return ResponseEntity.status(204).body(UserLoginPostRes.of(204, "Unknown User", loginInfo.toString()));
	}
	
	@PostMapping("/register")
	@ApiOperation(value = "회원 가입", notes = "<strong>아이디와 패스워드</strong>를 통해 회원가입 한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<? extends BaseResponseBody> register(
			@RequestBody @ApiParam(value="회원가입 정보", required = true) UserRegisterPostReq registerInfo) {
		
		//임의로 리턴된 User 인스턴스. 현재 코드는 회원 가입 성공 여부만 판단하기 때문에 굳이 Insert 된 유저 정보를 응답하지 않음.
		User user = userService.createUser(registerInfo);
		
		// 여기서 토큰 발행
		return ResponseEntity.ok(UserLoginPostRes.of(200, "Success", JwtTokenUtil.getToken(user.getName())));
		
//		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
	}
	
	
	@GetMapping("/kakao")
	public void  kakaoCallback(@RequestParam String code) throws Exception {

			System.out.println("1qjs " + code);
			String access_Token = userService.getKaKaoAccessToken(code);
			System.out.println("access : " + access_Token);
            userService.createKakaoUser(access_Token);
//	            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));

	    }
	
	
	@GetMapping("/naver")
	public String naverCallback(@RequestParam String code, @RequestParam String state) {
		String accessToken = userService.extractAccessToken(userService.requestAccessToken(userService.generateAuthCodeRequest(code, state)).getBody());
		System.out.println(accessToken);
		return userService.requestProfile(userService.generateProfileRequest(accessToken)).getBody();
	}
	
	
}
