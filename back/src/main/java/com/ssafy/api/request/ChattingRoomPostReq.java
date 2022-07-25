package com.ssafy.api.request;

import lombok.Setter;
import io.swagger.annotations.ApiModel;
import lombok.Getter;

@Getter
@Setter
@ApiModel("ChattingRoomCreatePostRequest")
public class ChattingRoomPostReq {
	private Long room_id;
}
