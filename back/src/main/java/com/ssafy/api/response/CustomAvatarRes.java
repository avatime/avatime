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
public class CustomAvatarRes {

	Long id;
	String name;
	String path;
	String base64;
	Long slot;
	String pic_info;
}
