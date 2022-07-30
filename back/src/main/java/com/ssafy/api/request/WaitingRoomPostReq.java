package com.ssafy.api.request;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("WaitingRoomCreatePostRequest")
public class WaitingRoomPostReq {
	@JsonProperty("user_id")
	private Long userId;
	
	private String name;
	
	@JsonProperty("head_count")
	private int headCount;
	
	private int age;
	
	@JsonProperty("sido_id")
	private int sidoId;
}
