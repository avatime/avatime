package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("RegisterOpenViduStreamRequest")
public class RegisterOpenViduStreamReq {

	Long meetingroom_id;
	Long user_id;
	String stream_id;
}
