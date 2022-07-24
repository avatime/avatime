package com.ssafy.api.service;

import java.util.List;

import com.ssafy.db.entity.MeetingRoomUserRelation;

/**
 *	미팅 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface MeetingRoomService {
	// 미팅방 만드는 함수
	void createMeetingRoom(int type, Long mainSessionId) throws Exception;
	void choiceAvatar() throws Exception;
	void finalChoice() throws Exception;
	List<MeetingRoomUserRelation> finalChoiceResult() throws Exception; 
}
