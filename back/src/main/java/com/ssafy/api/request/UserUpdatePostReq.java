package com.ssafy.api.request;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@ApiModel("UserUpdatePostReq")
public class UserUpdatePostReq {

	Long id;
	
	long id;
	
	String name;
	
	@JsonProperty("profile_image_path")
	String profileImagePath;
	
	String description;
}
