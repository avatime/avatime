package com.ssafy.api.response;

import org.json.JSONPropertyIgnore;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.common.model.response.BaseResponseBody;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ApiModel("UserRegisterPostRequest")
@ToString
public class UserRegisterPostRes extends BaseResponseBody{
	@JsonProperty("social_id")
	String socialId;
	
	@JsonProperty("social_type")
	int socialType;
	
	String gender;
	String name;
	
	@JsonProperty("profile_image_path")
	String profileImagePath;
	
	String description;
	
	public static UserRegisterPostRes of(Integer statusCode, String message, UserRegisterPostRes registerInfo) {
		UserRegisterPostRes res = new UserRegisterPostRes();
		res.setStatusCode(statusCode);
		res.setMessage(message);
		res.setSocialId(registerInfo.getSocialId());
		res.setSocialType(registerInfo.getSocialType());
		res.setGender(registerInfo.getGender());
		return res;
	}
}
