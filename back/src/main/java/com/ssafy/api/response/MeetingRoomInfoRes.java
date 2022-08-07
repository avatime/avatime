package com.ssafy.api.response;

import java.util.List;

import com.ssafy.common.model.response.BaseResponseBody;

import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@ApiModel("MeetingRoomInfoResponse")
public class MeetingRoomInfoRes extends BaseResponseBody {

	String created_time;
	Long chattingroom_id;
	Long men_chattingroom_id;
	Long women_chattingroom_id;
	List<MeetingRoomUserRes> meeting_user_info_list;
}