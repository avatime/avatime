package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("MeetingRoomIdRequest")
public class MeetingRoomIdReq {

	Long meetingroom_id;
}
