package com.ssafy.api.response;

import java.util.List;

import com.ssafy.api.response.entity.AvatarStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class AvatarChoiceRes {
	int status;
	List<AvatarStatus> avatar_list;
}
