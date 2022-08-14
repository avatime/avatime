package com.ssafy.api.response;

import org.checkerframework.checker.index.qual.SearchIndexBottom;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;

@Getter
@SearchIndexBottom
public class BalanceGameInfoRes {
	
	@JsonProperty("balance_id")
	private long balanceId;
	
	private String A;
	
	private String B;
}
