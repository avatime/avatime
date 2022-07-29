package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ChattingMessagePostRequest")
public class ChattingMessagePostReq {
	public enum MessageType {
		ENTER, TALK, LEAVE
	}

	private MessageType type;
	private Long chattingroom_id;
	private Long user_id;
	private String message;
}
