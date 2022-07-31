package com.ssafy.api.request;

import lombok.Setter;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.annotations.ApiModel;
import lombok.Getter;

@Getter
@Setter
@ApiModel("ChattingRoomCreatePostRequest")
public class ChattingRoomPostReq {
	@JsonProperty("room_id")
	private Long roomId;
}
