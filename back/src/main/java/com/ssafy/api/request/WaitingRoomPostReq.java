package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("WaitingRoomCreatePostRequest")
public class WaitingRoomPostReq {
	private Long userId;
	private String name;
	private int headCount;
	private int age;
	private int sidoId;
}
