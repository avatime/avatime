package com.ssafy.api.service;

import java.util.Map;

import com.ssafy.db.entity.WaitingRoom;
import com.ssafy.db.entity.WaitingRoomUserRelation;

public interface WaitingRoomUserRelationService {
	public WaitingRoomUserRelation save(Map<String, Long> userRelation, WaitingRoom waitingRoom);
}
