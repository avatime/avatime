package com.ssafy.api.response;

import java.util.List;

import com.ssafy.api.response.entity.Result;
import com.ssafy.common.model.response.BaseResponseBody;

import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/**
 * 미팅 최종 결정 유저 정보 조회 Entity ([GET] /api/v1/meeting/pick/{meetingroom_id}) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("FinalChoiceResponse")
public class FinalChoiceRes extends BaseResponseBody {

	boolean matched;
	Long meetingroom_id;
	List<Result> result_list;
	
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
