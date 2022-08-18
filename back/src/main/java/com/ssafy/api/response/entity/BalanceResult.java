package com.ssafy.api.response.entity;

import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
@ApiModel("BalanceResult")
public class BalanceResult {

	Long user_id;
	boolean result;
}
