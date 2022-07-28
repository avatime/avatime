package com.ssafy.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.db.entity.WaitingRoom;
import com.ssafy.db.entity.WaitingRoomUserRelation;
import com.ssafy.db.repository.WaitingRoomRepository;
import com.ssafy.db.repository.WaitingRoomUserRelationRepository;

@Service("waitingRoomUserRelationService")
public class WaitingRoomUserRelationServiceImpl implements WaitingRoomUserRelationService{
	@Autowired
	WaitingRoomUserRelationRepository waitingRoomUserRelationRepository;
	
	@Autowired
	WaitingRoomRepository waitingRoomRepository;
	
	@Override
	@Transactional
	public WaitingRoomUserRelation save(Long userId, WaitingRoom waitingRoom) {
		WaitingRoomUserRelation waitingRoomUserRelation = WaitingRoomUserRelation.builder()
				.waitingRoom(waitingRoom)
				.userId(userId).build();
		return waitingRoomUserRelationRepository.save(waitingRoomUserRelation);
	}
}
