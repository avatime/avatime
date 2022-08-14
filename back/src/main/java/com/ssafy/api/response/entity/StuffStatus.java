package com.ssafy.api.response.entity;

import com.ssafy.db.entity.Stuff;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

/**
 * 미팅 물건 선택 여부 Entity ([Message] /api/v1/meeting/stuff/{meetingroom_id}) 요청에 대한 응답값 중 stuff status (stuff list) 정의.
 */
@Getter
@Setter
@ApiModel("StuffStatusEntity")
public class StuffStatus {
	private Long id;
	private String name;
	private String image_path;
	private boolean selected;
	
	public StuffStatus(Stuff stuff) {
		this.id = stuff.getId();
		this.name = stuff.getName();
		this.image_path = stuff.getImagePath();
	}
}
