package com.ssafy.api.response.entity;

import com.ssafy.db.entity.Avatar;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

/**
 * 미팅 아바타 선택 여부 Entity ([Message] /api/v1/meeting/avatar/{meetingroom_id}) 요청에 대한 응답값 중 avatar status (avatar list) 정의.
 */
@Getter
@Setter
@ApiModel("ResultEntity")
public class AvatarStatus {
	private Long id;
	private String name;
	private String imagePath;
	private boolean selected;
	
	public AvatarStatus(Avatar avatar) {
		this.id = avatar.getId();
		this.name = avatar.getName();
		this.imagePath = avatar.getImagePath();
	}
}
