package com.ssafy.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.db.entity.ChattingRoom;
import com.ssafy.db.repository.ChattingRoomRepository;

@Service("chattingRoomService")
public class ChattingRoomServiceImpl implements ChattingRoomService{
	@Autowired
	ChattingRoomRepository chattingRoomRepository;
	
	@Override
	@Transactional
	public ChattingRoom saveByWaitingRoom(Long roomId) {
		ChattingRoom chattingRoom = ChattingRoom.ByWaitingRoomBuilder()
				.roomId(roomId).build();
		return chattingRoomRepository.save(chattingRoom);
	}
}
