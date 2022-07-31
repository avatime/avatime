package com.ssafy.api.service;

import java.util.List;

import com.ssafy.db.entity.User;
import com.ssafy.db.entity.WaitingRoom;
import com.ssafy.db.entity.WaitingRoomUserRelation;

public interface WaitingRoomUserRelationService {
	public WaitingRoomUserRelation save(User user, WaitingRoom waitingRoom);
	public List<WaitingRoomUserRelation> findByWaitingRoomIdAndType(Long wrId);
}
