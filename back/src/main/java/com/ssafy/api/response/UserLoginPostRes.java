package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.User;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 유저 로그인 API ([POST] /api/v1/auth) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("UserLoginPostResponse")
public class UserLoginPostRes extends BaseResponseBody{
	@ApiModelProperty(name="JWT 인증 토큰", example="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN...")
	String accessToken;
	
	Long userId;
	String socialId;
	String gender;
	String name;
	String profileImagePath;
	String description;
	int socialType;
	
	public static UserLoginPostRes of(Integer statusCode, String message, User user, String accessToken) {
		UserLoginPostRes res = new UserLoginPostRes();
		res.setStatusCode(statusCode);
		res.setMessage(message);
		res.setAccessToken(accessToken);
		res.setUserId(user.getId());
		res.setSocialId(user.getSocialId());
		res.setGender(user.getGender());
		res.setName(user.getName());
		res.setProfileImagePath(user.getProfileImagePath());
		res.setDescription(user.getDescription());
		res.setSocialType(user.getSocialType());
		return res;
	}

}
