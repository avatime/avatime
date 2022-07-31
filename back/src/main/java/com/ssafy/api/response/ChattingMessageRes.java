package com.ssafy.api.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChattingMessageRes {
	private String chat_type;
	private Long user_id;
	private String name;
	private String message;
	private String created_time;
}
