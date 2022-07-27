package com.ssafy.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.api.request.ChattingRoomPostReq;
import com.ssafy.db.entity.ChattingRoom;
import com.ssafy.db.repository.ChattingRoomRepository;

@Service("chattingRoomService")
public class ChattingRoomServiceImpl implements ChattingRoomService{
	@Autowired
	ChattingRoomRepository chattingRoomRepository;
	
	@Override
	@Transactional
	public ChattingRoom saveByWaitingRoom(ChattingRoomPostReq value) {
		ChattingRoom chattingRoom = ChattingRoom.ByWaitingRoomBuilder()
				.roomId(value.getRoom_id()).build();
		return chattingRoomRepository.save(chattingRoom);
	}
}
