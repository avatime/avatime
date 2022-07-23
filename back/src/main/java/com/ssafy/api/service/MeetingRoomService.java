package com.ssafy.api.service;

import java.util.List;

import com.ssafy.db.entity.MeetingRoomUserRelation;

/**
 *	미팅 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface MeetingRoomService {
	// 미팅방 만드는 함수
	void createMeetingRoom(String type, Long mainSessionId) throws Exception;
	boolean isSelectedAvatar(Long meetingRoomId, Long avatarId) throws Exception;
	void choiceAvatar(Long meetingRoomId, Long userId, Long avatarId) throws Exception;
	void finalChoice(Long meetingRoomId, Long userId, Long pickUserId) throws Exception;
	List<MeetingRoomUserRelation> finalChoiceResult(Long meetingRoomId) throws Exception;
}
