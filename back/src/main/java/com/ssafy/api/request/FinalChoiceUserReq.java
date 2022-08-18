package com.ssafy.api.request;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

/**
 * 유저가 선택한 다른 유저 ([PATCH] /api/v1/meeting/pick) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("FinalChoiceUserRequest")
public class FinalChoiceUserReq {

	@JsonProperty("meetingroom_id")
	Long meetingRoomId;
	
	@JsonProperty("user_id")
	Long userId;
	
	@JsonProperty("pick_user_id")
	Long pickUserId;
}
