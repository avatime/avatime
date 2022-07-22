package com.ssafy.api.response.entity;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

/**
 * 미팅 최종 결정 유저 정보 조회 Entity ([GET] /api/v1/meeting/pick/{meetingroom_id}) 요청에 대한 응답값 중 result 정의.
 */
@Getter
@Setter
@ApiModel("ResultEntity")
public class Result {

	Long id;
	String name;
	String gender;
	String profileImagePath;
	Long pickUserId;
}
