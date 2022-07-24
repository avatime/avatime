package com.ssafy.api.service;

import com.ssafy.api.request.ChattingRoomPostReq;
import com.ssafy.db.entity.ChattingRoom;

public interface ChattingRoomService {
	public ChattingRoom saveByWaitingRoom(ChattingRoomPostReq value);
}
