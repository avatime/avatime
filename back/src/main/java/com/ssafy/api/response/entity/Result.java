package com.ssafy.api.response.entity;

import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/**
 * 미팅 최종 결정 유저 정보 조회 Entity ([GET] /api/v1/meeting/pick/{meetingroom_id}) 요청에 대한 응답값 중 result 정의.
 */
@Builder
@Getter
@Setter
@ApiModel("ResultEntity")
public class Result {

	Long id;
	String name;
	String gender;
	Long avatar_id;
	String avatar_name;
	String avatar_image_path;
	Long pick_user_id;
	
}
