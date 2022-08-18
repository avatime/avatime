package com.ssafy.api.service;

import java.util.List;
import java.util.Optional;

import com.ssafy.db.entity.User;
import com.ssafy.db.entity.WaitingRoom;
import com.ssafy.db.entity.WaitingRoomUserRelation;

public interface WaitingRoomUserRelationService {
	public WaitingRoomUserRelation save(int type, User user, WaitingRoom waitingRoom);
	List<WaitingRoomUserRelation> findByWaitingRoomIdAndType(Long wrId, int type);
	Optional<WaitingRoomUserRelation> findBystate(Long wrId, Long userId);
}
