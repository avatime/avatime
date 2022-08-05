package com.ssafy.api.response;

import java.util.List;

import com.ssafy.api.response.entity.StreamUser;
import com.ssafy.common.model.response.BaseResponseBody;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("MeetingRoomInfoResponse")
//public class FinalChoiceRes extends BaseResponseBody {
public class MeetingRoomInfoRes extends BaseResponseBody {

	String created_time;
	Long chattingroom_id;
	Long men_chattingroom_id;
	Long women_chattingroom_id;
	boolean last_pick_status;
	List<StreamUser> stream_list;
}