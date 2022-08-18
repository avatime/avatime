package com.ssafy.api.response;

import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@ApiModel("MeetingRoomUserResponse")
public class MeetingRoomUserRes {

	Long user_id;
	String user_name;
	Long avatar_id;
	String avatar_image_path;
	String avatar_name;
	String gender;
}
