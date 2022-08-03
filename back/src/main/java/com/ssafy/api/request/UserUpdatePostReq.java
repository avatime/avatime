package com.ssafy.api.request;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserUpdatePostReq")
public class UserUpdatePostReq {
	
	@JsonProperty("user_id")
	long userId;
	
	String name;
	
	@JsonProperty("profile_image_path")
	String profileImagePath;
	
	String description;
}
