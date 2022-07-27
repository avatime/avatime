package com.ssafy.api.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class WaitingRoomRes {
	private String name;
	
	private int headCount;
	
	private int status;
	
	private String age;
	
	private String sido;
}
