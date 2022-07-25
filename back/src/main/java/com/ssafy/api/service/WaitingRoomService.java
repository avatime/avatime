package com.ssafy.api.service;

import java.util.List;

import com.ssafy.api.request.WaitingRoomPostReq;
import com.ssafy.db.entity.WaitingRoom;

public interface WaitingRoomService {
	List<WaitingRoom> findAll();
	public WaitingRoom save(WaitingRoomPostReq value);
}