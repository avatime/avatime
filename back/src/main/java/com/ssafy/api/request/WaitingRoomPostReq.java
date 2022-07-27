package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("WaitingRoomCreatePostRequest")
public class WaitingRoomPostReq {
	private Long user_id;
	private String name;
	private int head_count;
	private String age;
	private int sido_id;
}
