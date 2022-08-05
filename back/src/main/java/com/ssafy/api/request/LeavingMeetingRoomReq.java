package com.ssafy.api.request;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

/**
 * meeting room leave API ([Message] /topic/meeting/leave) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("LeavingMeetingRoomRequest")
public class LeavingMeetingRoomReq {

	@JsonProperty("user_id")
	Long userId; 
	
	@JsonProperty("meetingroom_id")
	Long meetingRoomId; 
}