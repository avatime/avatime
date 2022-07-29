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
	private String type;
	private Long userId;
	private String userName;
	private String message;
	private String createdTime;
}
