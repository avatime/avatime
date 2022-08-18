package com.ssafy.api.response;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("LastPickStatusResponse")
public class LastPickStatusRes {

	boolean last_pick_status;
}
