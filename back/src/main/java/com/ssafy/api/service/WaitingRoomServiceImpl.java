package com.ssafy.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.api.request.WaitingRoomPostReq;
import com.ssafy.db.entity.WaitingRoom;
import com.ssafy.db.repository.WaitingRoomRepository;

@Service("waitingRoomService")
public class WaitingRoomServiceImpl implements WaitingRoomService{
	@Autowired
	WaitingRoomRepository waitingRoomRepository;
	
	@Override
	public List<WaitingRoom> findAll() {
		return waitingRoomRepository.findAll(Sort.by(Sort.Direction.DESC, "createdTime"));
	}
	
	@Override
	@Transactional
	public WaitingRoom save(WaitingRoomPostReq value) {
		WaitingRoom waitingRoom = WaitingRoom.builder()
				.name(value.getName())
				.headCount(value.getHeadCount())
				.ageId(value.getAgeId())
				.sidoId(value.getSidoId()).build();
		return waitingRoomRepository.save(waitingRoom);
	}
	
	@Override
	public WaitingRoom findById(Long waitingRoomId) {
		WaitingRoom waitingroom = waitingRoomRepository.findById(waitingRoomId).get();
		return null;
	}	
}