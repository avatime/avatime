package com.ssafy.api.request;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("WaitingRoomStartRequest")
public class WaitingRoomStartReq {
	@JsonProperty("waiting_room_id")
	private Long waitingRoomId;
}
