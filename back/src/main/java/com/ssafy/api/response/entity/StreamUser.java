package com.ssafy.api.response.entity;

import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@ApiModel("StreamUser")
public class StreamUser {

	Long user_id;
	String user_name;
	Long avatar_id;
	String avatar_name;
	String avatar_image_path;
}
