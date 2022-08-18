package com.ssafy.api.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.common.model.response.BaseResponseBody;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * 유저 회원가입 API ([POST] /api/v1/users) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("UserRegisterPostRequest")
@ToString
public class UserRegisterPostReq extends BaseResponseBody {
	@ApiModelProperty(name="유저 ID", example="ssafy_web")
	@JsonProperty("social_id")
	String socialId;
	@ApiModelProperty(name="유저 Password", example="your_password")
	@JsonProperty("social_type")
	int socialType;
	
	String gender;
	
	String name;
	
	@JsonProperty("profile_image_path")
	String profileImagePath;
	
	String description;
	
	public static UserRegisterPostReq of(Integer statusCode, String message, UserRegisterPostReq registerInfo) {
		UserRegisterPostReq res = new UserRegisterPostReq();
		res.setStatusCode(statusCode);
		res.setMessage(message);
		res.setSocialId(registerInfo.getSocialId());
		res.setSocialType(registerInfo.getSocialType());
		res.setGender(registerInfo.getGender());
		return res;
	}
}
