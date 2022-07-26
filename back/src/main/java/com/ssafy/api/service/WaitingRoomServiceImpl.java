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
		return waitingRoomRepository.findAll(Sort.by(Sort.Direction.DESC, "created_time"));
	}
	
	@Override
	@Transactional
	public WaitingRoom save(WaitingRoomPostReq value) {
		WaitingRoom waitingRoom = WaitingRoom.builder()
				.name(value.getName())
				.head_count(value.getHead_count())
				.age(value.getAge())
				.sido_id(value.getSido_id()).build();
		return waitingRoomRepository.save(waitingRoom);
	}
}