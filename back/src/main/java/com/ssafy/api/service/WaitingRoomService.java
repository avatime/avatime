package com.ssafy.api.service;

import java.util.List;
import java.util.Optional;

import com.ssafy.api.request.WaitingRoomPostReq;
import com.ssafy.db.entity.WaitingRoom;

public interface WaitingRoomService {
	List<WaitingRoom> findAll();
	Optional<WaitingRoom> findById(Long waitingRoomId);
	public WaitingRoom save(WaitingRoomPostReq value);
}