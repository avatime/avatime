package com.ssafy.api.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class WaitingRoomRes {
	private String name;
	
	@JsonProperty("head_count")
	private int headCount;
	
	private int status;
	
	@JsonProperty("cnt_man")
	private int cntMan;
	
	@JsonProperty("cnt_woman")
	private int cntWoman;
	
	private String age;
	
	private String sido;
}
