package com.ssafy.api.request;

import org.checkerframework.checker.index.qual.SearchIndexBottom;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;

@Getter
@SearchIndexBottom
public class BalanceStartReq {
	
	@JsonProperty("meetingroom_id")
	private long meetingroomId;
}
