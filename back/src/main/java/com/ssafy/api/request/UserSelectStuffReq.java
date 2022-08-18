package com.ssafy.api.request;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

/**
 * 유저가 선택한 물건 ([PATCH] /api/v1/meeting/selectStuff) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("UserSelectStuff")
public class UserSelectStuffReq {
	
	@JsonProperty("meetingroom_id")
	Long meetingRoomId;
	
	@JsonProperty("user_id")
	Long userId;
	
	@JsonProperty("stuff_id")
	Long stuffId;
}
