package com.ssafy.api.response;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class WaitingRoomRes {
	
	private Long id;
	
	private String name;
	
	@JsonProperty("head_count")
	private int headCount;
	
	private int status;
	
	@JsonProperty("cnt_man")
	private Long cntMan;
	
	@JsonProperty("cnt_woman")
	private Long cntWoman;
	
	private String age;
	
	private String sido;
	
	@JsonProperty("created_time")
	private Date createdTime;
}
