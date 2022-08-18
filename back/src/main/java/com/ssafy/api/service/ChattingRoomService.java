package com.ssafy.api.service;

import java.util.List;

import com.ssafy.db.entity.ChattingRoom;

public interface ChattingRoomService {
	public ChattingRoom saveByWaitingRoom(Long roomId);
	public ChattingRoom createRoomInMeetingRoom(Long roomId);
	ChattingRoom findByRoomIdAndType(Long roomId, int type);
	List<ChattingRoom> findAllByRoomId(Long roomId);
}
