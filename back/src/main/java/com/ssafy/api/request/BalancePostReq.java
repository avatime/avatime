package com.ssafy.api.request;

import org.checkerframework.checker.index.qual.SearchIndexBottom;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;

@Getter
@SearchIndexBottom
public class BalancePostReq {
	
	@JsonProperty("meetingroom_id")
	private long meetingroomId;
	
	@JsonProperty("balance_id")
	private long balanceId;
	
	@JsonProperty("user_id")
	private long userId;
	
	private boolean result;

}
