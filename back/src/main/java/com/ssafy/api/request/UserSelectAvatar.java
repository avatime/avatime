package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

/**
 * 유저가 선택한 아바타 ([PATCH] /api/v1/meeting/selectAvatar) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("UserSelectAvatar")
public class UserSelectAvatar {

	Long user_id;
	Long avatar_id;
}
