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
	Long gender_chattingroom_id;
	boolean last_pick_status;
	List<StreamUser> stream_list;

	public static FinalChoiceRes of(Integer statusCode, String message, FinalChoiceRes finalChoiceRes) {
		FinalChoiceRes res = new FinalChoiceRes();
		res.setMeetingroom_id(finalChoiceRes.meetingroom_id);
		res.setMatched(finalChoiceRes.matched);
		res.setResult_list(finalChoiceRes.result_list);
		res.setStatusCode(statusCode);
		res.setMessage(message);
		return res;
	}
}