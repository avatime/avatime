package com.ssafy.api.service;

import java.util.List;

import com.ssafy.db.entity.WaitingRoom;
import com.ssafy.dto.WaitingRoomValue;

public interface WaitingRoomService {
	List<WaitingRoom> findAll();
	public WaitingRoom save(WaitingRoomValue value);
}