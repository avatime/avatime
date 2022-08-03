package com.ssafy.api.service;

import java.util.Optional;

import com.ssafy.db.entity.ChattingRoom;

public interface ChattingRoomService {
	public ChattingRoom saveByWaitingRoom(Long roomId);
	public ChattingRoom createRoomInMeetingRoom(Long roomId);
	Optional<ChattingRoom> findByRoomIdAndType(Long roomId);
}
