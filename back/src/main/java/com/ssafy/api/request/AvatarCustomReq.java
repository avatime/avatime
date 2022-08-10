package com.ssafy.api.request;

import org.springframework.web.multipart.MultipartFile;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("AvatarCustomRequest")
public class AvatarCustomReq {

	Long user_id;
	String avatar_name;
	MultipartFile image;
}
