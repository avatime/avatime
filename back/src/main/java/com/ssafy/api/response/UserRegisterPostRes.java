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
	@ApiModelProperty(name="유저 ID", example="ssafy_web")
	String socialId;
	@ApiModelProperty(name="유저 Password", example="your_password")
	int socialType;
	String gender;
	String name;
	long profileId;
	String description;
	
	public static UserRegisterPostRes of(Integer statusCode, String message, UserRegisterPostReq registerInfo) {
		UserRegisterPostRes res = new UserRegisterPostRes();
		res.setStatusCode(statusCode);
		res.setMessage(message);
		res.setSocialId(registerInfo.getSocialId());
		res.setSocialType(registerInfo.getSocialType());
		res.setGender(registerInfo.getGender());
		return res;
	}
}
