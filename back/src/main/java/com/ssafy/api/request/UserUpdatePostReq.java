package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserUpdatePostReq")
public class UserUpdatePostReq {
	String name;
	String profileImagePath;
	String description;
}
