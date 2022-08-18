package com.ssafy.api.request;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * meeting room create API ([POST] /api/v1/meeting) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("MeetingRoomCreatePostRequest")
public class MeetingRoomPostReq {

	@ApiModelProperty(name="Meeting Room Type", example="0")
	int type;
	
	@JsonProperty("main_session_id")
	Long mainSessionId; 
}
