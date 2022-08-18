package com.ssafy.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ChatMessage {
	public enum MessageType {
		ENTER, TALK, LEAVE
	}

	private MessageType type;
	private Long chatRoomId;
	private String userName;
	private String message;
	private String profileURL;
}
