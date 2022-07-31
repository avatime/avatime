package com.ssafy.api.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class WaitingUserRes {
	
	private Long id;
	
	private String name;
	
	private String gender;
	
	@JsonProperty("profile_img_path")
	private String profileImgPath;
}
