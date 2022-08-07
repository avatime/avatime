package com.ssafy.api.request;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

/**
 * 유저가 선택한 아바타 ([PATCH] /api/v1/meeting/selectAvatar) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("UserSelectAvatar")
public class UserSelectAvatarReq {
	
	@JsonProperty("meeting_room_id")
	Long meetingRoomId;
	
	@JsonProperty("user_id")
	Long userId;
	
	@JsonProperty("avatar_id")
	Long avatarId;
}
