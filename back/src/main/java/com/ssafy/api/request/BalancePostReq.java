package com.ssafy.api.request;

import org.checkerframework.checker.index.qual.SearchIndexBottom;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;

@Getter
@SearchIndexBottom
public class BalancePostReq {
	
	@JsonProperty("meetingroom_id")
	private Long meetingroomId;
	
	@JsonProperty("balance_id")
	private Long balanceId;
	
	@JsonProperty("user_id")
	private Long userId;
	
	private boolean result;

}
