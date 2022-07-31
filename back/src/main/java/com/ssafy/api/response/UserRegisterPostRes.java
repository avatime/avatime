package com.ssafy.api.response;

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
	Long userId;
	String socialId;
	int socialType;
	String gender;
	String name;
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
