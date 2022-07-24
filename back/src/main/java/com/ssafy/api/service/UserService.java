package com.ssafy.api.service;

import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;

import com.google.gson.JsonElement;
import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.api.request.UserUpdatePostReq;
import com.ssafy.db.entity.User;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface UserService {
	User createUser(UserRegisterPostReq userRegisterInfo);
	User getUserByUserName(String name);
	User getUserByUserId(Long userId);
	User getUserBySocialIdAndSocialType(String socialId, int socialType);
	User updateUserInfo(Long userId, UserUpdatePostReq updateInfo);
	public String getKaKaoAccessToken(String code);
	public String createKakaoUser(String token) throws Exception;
	ResponseEntity<String> requestProfile(HttpEntity request);
	HttpEntity<MultiValueMap<String, String>> generateProfileRequest(String accessToken);
	String extractAccessToken(String accessTokenResponse);
	ResponseEntity<String> requestAccessToken(HttpEntity request);
	HttpEntity<MultiValueMap<String, String>> generateAuthCodeRequest(String code, String state);
	boolean checkNameDuplicate(String name);
	

}
