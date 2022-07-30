package com.ssafy.api.service;

import com.ssafy.db.entity.User;
import com.ssafy.db.entity.WaitingRoom;
import com.ssafy.db.entity.WaitingRoomUserRelation;

public interface WaitingRoomUserRelationService {
	public WaitingRoomUserRelation save(User user, WaitingRoom waitingRoom);
}
