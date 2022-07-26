package com.ssafy.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;

@Data
@ToString
@AllArgsConstructor
public class ChatMessage {
	public enum MessageType {
		ENTER, TALK
	}

	private MessageType type;
	private Long chatRoomId;
	private String userName;
	private String message;
	private String profileURL;
}
