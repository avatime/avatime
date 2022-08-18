package com.ssafy.api.service;

import java.util.List;

import com.ssafy.db.entity.Balance;
import com.ssafy.db.entity.MeetingRoom;
import com.ssafy.db.entity.MeetingRoomUserRelation;

/**
 *	미팅 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface MeetingRoomService {
	// 미팅방 만드는 함수
	public MeetingRoom createMeetingRoomSession(int type, Long mainSessionId) throws Exception;
	public boolean isSelectedAvatar(Long meetingRoomId, Long avatarId) throws Exception;
	public void choiceAvatar(Long meetingRoomId, Long userId, Long avatarId) throws Exception;
	public void finalChoice(Long meetingRoomId, Long userId, Long pickUserId) throws Exception;
	public List<MeetingRoomUserRelation> finalChoiceResult(Long meetingRoomId) throws Exception;
	public Long createMeetingRoom(Long waitingRoomId) throws Exception;
	public void timer(Long meetingRoomId, int time, String type) throws Exception;
	public int userNumber(Long meetingRoomId) throws Exception;
	public MeetingRoomUserRelation findUser(Long meetingRoomId, Long userId);
	public void save(MeetingRoomUserRelation meetingRoomUserRelation);
	public void save(MeetingRoom meetingRoom);
	public MeetingRoom findById(Long meetingRoomId);
	public void pickAvatar(Long meetingRoomId) throws Exception;
	public List<MeetingRoomUserRelation> findAllByMeetingRoomId(Long meetingRoomId) throws Exception;
	int sendAvatarInfo(Long meetingRoomId) throws Exception;
	MeetingRoom findSubMeetingRoom(Long mainMeetingRoomId, Long userId) throws Exception;
	public boolean isSelectedStuff(Long meetingRoomId, String gender, Long stuffId) throws Exception;
	public void choiceStuff(Long meetingRoomId, Long userId, Long stuffId) throws Exception;
	public int selectStuffNum(Long meetingRoomId) throws Exception;
	int sendStuffInfo(Long meetingRoomId) throws Exception;
	public void sendBalanceResult(Long meetingRoomId, Balance balance) throws Exception;
}
