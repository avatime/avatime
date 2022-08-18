package com.ssafy.api.request;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("statePostRequest")
public class StatePostReq {
	
	@JsonProperty("user_id")
	Long userId;
	
	@JsonProperty("room_id")
	Long roomId;
	
	int type;
}
