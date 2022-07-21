package com.ssafy.api.service;

import java.util.List;

import com.ssafy.db.entity.MeetingRoom;

/**
 *	미팅 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface MeetingRoomService {
	void createMeetingRoom(String type, Long mainSessionId) throws Exception;
	List<MeetingRoom> getMeetingRoomList();
	MeetingRoom GetMeetingRoomByMeetingRoomId(Long id);
}
