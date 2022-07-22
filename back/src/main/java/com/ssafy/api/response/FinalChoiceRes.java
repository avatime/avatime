package com.ssafy.api.response;

import java.util.List;

import com.ssafy.api.response.entity.Result;
import com.ssafy.db.entity.User;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

/**
 * 미팅 최종 결정 유저 정보 조회 Entity ([GET] /api/v1/meeting/pick/{meetingroom_id}) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("FinalChoiceResponse")
public class FinalChoiceRes {

	boolean matched;
	int meetingroom_id;
	List<Result> result_list;
	
	public static FinalChoiceRes of(int meetingroom_id) {
		FinalChoiceRes res = new FinalChoiceRes();
		res.setMeetingroom_id(meetingroom_id);
		return res;
	}
}
