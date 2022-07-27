package com.ssafy.api.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.db.entity.WaitingRoom;
import com.ssafy.db.entity.WaitingRoomUserRelation;
import com.ssafy.db.repository.WaitingRoomUserRelationRepository;

@Service("waitingRoomUserRelationService")
public class WaitingRoomUserRelationServiceImpl implements WaitingRoomUserRelationService{
	@Autowired
	WaitingRoomUserRelationRepository waitingRoomUserRelationRepository;
	
	@Override
	@Transactional
	public WaitingRoomUserRelation save(Map<String, Long> userRelation, WaitingRoom waitingRoom) {
		WaitingRoomUserRelation waitingRoomUserRelation = WaitingRoomUserRelation.builder()
				.waitingRoom(waitingRoom)
				.userId(userRelation.get("user_id")).build();
		return waitingRoomUserRelationRepository.save(waitingRoomUserRelation);
	}
}
