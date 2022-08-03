package com.ssafy.api.service;

import java.util.Optional;

import com.ssafy.db.entity.ChattingRoom;

public interface ChattingRoomService {
	public ChattingRoom saveByWaitingRoom(Long roomId);
<<<<<<< HEAD
	public ChattingRoom createRoomInMeetingRoom(Long roomId);
=======
	Optional<ChattingRoom> findByRoomIdAndType(Long roomId);
>>>>>>> 8c18386 (feat(waitingstate): 접수처 구현)
}
