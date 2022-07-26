package com.ssafy.api.controller;

import java.math.BigInteger;
import java.net.URI;
import java.security.SecureRandom;

import org.omg.CORBA.UserException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.yaml.snakeyaml.util.UriEncoder;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.ssafy.api.request.UserLoginPostReq;
import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.api.response.UserLoginPostRes;
import com.ssafy.api.response.UserRegisterPostRes;
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
		int socialType = loginInfo.getSocialType();
		
		User user = userService.getUserBySocialIdAndSocialType(socialId, socialType);
		
		// 로그인 요청한 유저가 DB에 존재하는 유저인지 확인. (존재하는 회원인지 판단)
		if(user != null) {
			// 유저가 존재하면, 로그인 성공으로 응답.(액세스 토큰을 포함하여 응답값 전달)
			// 성별 동의를 하지 않은 유저라면,
			if (user.getGender() == null) {
				return ResponseEntity.status(409).body(BaseResponseBody.of(409, "성별 제공 항목에 동의하셔야합니다."));
			}
			loginInfo.setToken(JwtTokenUtil.getToken(user.getName()));
			return ResponseEntity.status(200).body(UserLoginPostRes.of(200, "Success", loginInfo.toString()));
//			return ResponseEntity.ok(UserLoginPostRes.of(200, "Success", JwtTokenUtil.getToken(user.getName())));
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
	}
	
	
	@GetMapping("/naver")
	public ResponseEntity<?> naverCallback(@RequestParam String code, @RequestParam String state) throws Exception{
		System.out.println(code);
		
		// 네이버 소셜 타입 1
		int socialType = 1;
		
		// 토큰 가져오기
		String accessToken = userService.extractAccessToken(userService.requestAccessToken(userService.generateAuthCodeRequest(code, state)).getBody());
		
		// 사용자 정보 가져오기
		ResponseEntity<String> response = userService.requestProfile(userService.generateProfileRequest(accessToken));
		// 경고 무시
		@SuppressWarnings("deprecation")
		JsonParser parser = new JsonParser();
		@SuppressWarnings("deprecation")
		JsonElement element = parser.parse(response.getBody());
		JsonElement userInfo = element.getAsJsonObject().get("response");
		String socialId = userInfo.getAsJsonObject().get("email").toString();
		
		// socialId(email)와 socialType을 통해 DB에 있는지 체크
		User user = userService.getUserBySocialIdAndSocialType(socialId, socialType);
		System.out.println("element: "+ element);
		// 회원 등록 진행
		if (user == null) {
			
			UserRegisterPostReq registerInfo = new UserRegisterPostReq();
			registerInfo.setGender(userInfo.getAsJsonObject().get("gender").toString());
			registerInfo.setSocialId(userInfo.getAsJsonObject().get("email").toString());
			registerInfo.setSocialType(socialType);
			System.out.println("Unknown User");
			return ResponseEntity.status(204).body(UserRegisterPostReq.of(204, "Unknown User", registerInfo));	
		}else {
			return ResponseEntity.ok(UserLoginPostRes.of(200, "Success", JwtTokenUtil.getToken(user.getName())));
		}
	}
	
	@GetMapping("/kakao")
	public ResponseEntity<?> kakaoCallback(@RequestParam String code) throws Exception {
		System.out.println("code: "+ code);
		
		// 카카오 소셜 타입 2
		int socialType = 2;
		
		// 토큰 가져오기
		String access_Token = userService.getKaKaoAccessToken(code);
		
		// 사용자 정보 가져오기
        String response = userService.createKakaoUser(access_Token);
        
        // 경고 무시
 		@SuppressWarnings("deprecation")
 		JsonParser parser = new JsonParser();
 		@SuppressWarnings("deprecation")
 		JsonElement element = parser.parse(response);
 		JsonElement userInfo = element.getAsJsonObject().get("kakao_account");
 		System.out.println("element: " + element);
 		// socialId랑 성별에 동의하지 않았으면 리턴
 		if (userInfo.getAsJsonObject().get("email_needs_agreement").getAsBoolean() || userInfo.getAsJsonObject().get("gender_needs_agreement").getAsBoolean()) {
 			System.out.println("여기 나오냐?");
 			return ResponseEntity.status(204).body(UserRegisterPostRes.of(204, "E-mail과 성별에 동의해주세요."));
 		}
 		
		String socialId = userInfo.getAsJsonObject().get("email").toString().trim();
		
		// socialId(email)와 socialType을 통해 DB에 있는지 체크
		User user = userService.getUserBySocialIdAndSocialType(socialId, socialType);
		// 회원 등록 진행
		if (user == null) {
			
			UserRegisterPostRes registerInfo = new UserRegisterPostRes();
			registerInfo.setGender(userInfo.getAsJsonObject().get("gender").toString());
			registerInfo.setSocialId(userInfo.getAsJsonObject().get("email").toString());
			registerInfo.setSocialType(socialType);
			System.out.println("회원등록 진행 했어?");
			System.out.println("registerInfo: " + registerInfo.toString());
			return ResponseEntity.status(204).body(registerInfo);	
		}else {
			System.out.println("user: " + user.getName());
			return ResponseEntity.ok(UserLoginPostRes.of(200, "Success", JwtTokenUtil.getToken(user.getName())));
		}
	}
	
	
	// 아이디 중복 체크
	@GetMapping("/check/{name}")
	public ResponseEntity<Boolean> checkNameDuplicate(@PathVariable String name){
		boolean response;
		response = userService.checkNameDuplicate(name);
		return ResponseEntity.ok(!response);
	}
}

