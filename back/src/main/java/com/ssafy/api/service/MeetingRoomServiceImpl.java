package com.ssafy.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.db.entity.MeetingRoom;
import com.ssafy.db.entity.MeetingRoomUserRelation;
import com.ssafy.db.entity.WaitingRoomUserRelation;
import com.ssafy.db.repository.MeetingRoomRepository;
import com.ssafy.db.repository.MeetingRoomUserRelationRepository;
import com.ssafy.db.repository.WaitingRoomUserRelationRepository;

/**
 *	미팅 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("meetingService")
public class MeetingRoomServiceImpl implements MeetingRoomService {

	@Autowired
	MeetingRoomRepository meetingRoomRepository;
	
	@Autowired
	MeetingRoomUserRelationRepository meetingRoomUserRelationRepository;
	
	@Autowired
	WaitingRoomUserRelationRepository waitingRoomUserRelationRepository;
	
	@Override
	public MeetingRoom createMeetingRoomSession(int type, Long mainSessionId) throws Exception {
		// TODO Auto-generated method stub
		// main session
		MeetingRoom meetingRoom = new MeetingRoom();
		try {
			meetingRoom.setType(type);
			if(type == 0) {
				mainSessionId = meetingRoomRepository.save(meetingRoom).getId();
			}
			else if(type == 1) {
				
			}
			meetingRoom.setMainSessionId(mainSessionId);
			meetingRoomRepository.save(meetingRoom);
		} catch (Exception e) {
		}
		
		return meetingRoom;
	}

	@Override
	public void choiceAvatar(Long meetingRoomId, Long userId, Long avatarId) throws Exception {
		// TODO Auto-generated method stub
		MeetingRoomUserRelation meetingRoomUserRelation = meetingRoomUserRelationRepository.findByMeetingRoomIdAndUserId(meetingRoomId, userId).get();
		meetingRoomUserRelation.setAvatarId(avatarId);
		meetingRoomUserRelationRepository.save(meetingRoomUserRelation);
	}

	@Override
	public void finalChoice(Long meetingRoomId, Long userId, Long pickUserId) throws Exception {
		// TODO Auto-generated method stub
		MeetingRoomUserRelation meetingRoomUser = meetingRoomUserRelationRepository.findByMeetingRoomIdAndUserId(meetingRoomId, userId).get();
		meetingRoomUser.setPickUserId(pickUserId);
		MeetingRoomUserRelation pickedUserInfo = meetingRoomUserRelationRepository.findByMeetingRoomIdAndUserId(meetingRoomId, userId).get();
		if(pickedUserInfo.getPickUserId() == userId) {
			meetingRoomUser.setMatched(true);
			pickedUserInfo.setMatched(true);
			meetingRoomUserRelationRepository.save(pickedUserInfo);
		} else {
			meetingRoomUser.setMatched(false);
		}
		meetingRoomUserRelationRepository.save(meetingRoomUser);
	}

	@Override
	public List<MeetingRoomUserRelation> finalChoiceResult(Long meetingRoomId) throws Exception {
		// TODO Auto-generated method stub
		return meetingRoomUserRelationRepository.findAllByMeetingRoomId(meetingRoomId);
	}

	@Override
	public boolean isSelectedAvatar(Long meetingRoomId, Long avatarId) throws Exception {
		// TODO Auto-generated method stub
		return meetingRoomUserRelationRepository.existsByMeetingRoomIdAndAvatarId(meetingRoomId, avatarId);
	}
	
	public Long createMeetingRoom(Long waitingRoomId) throws Exception {
		// meeting room 생성
		MeetingRoom meetingRoom = createMeetingRoomSession(0, waitingRoomId);
		Long meetingRoomId = meetingRoom.getId();
		// meetingroomuserrelation 삽입
		List<WaitingRoomUserRelation> list = waitingRoomUserRelationRepository.findByWaitingRoomId(waitingRoomId).get();
		for(WaitingRoomUserRelation user : list) {
			if(user.getType() == 1 || user.getType() == 0) {
				MeetingRoomUserRelation meetingRoomUserRelation = MeetingRoomUserRelation.builder()
						.meetingRoom(meetingRoom)
						.user(user.getUser())
						.build();
				meetingRoomUserRelationRepository.save(meetingRoomUserRelation);
			}
		}
		// meetingroomid 리턴
		return meetingRoomId;
	}

}
