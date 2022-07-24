package com.ssafy.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.db.entity.MeetingRoom;
import com.ssafy.db.entity.MeetingRoomUserRelation;
import com.ssafy.db.repository.MeetingRoomRepository;

/**
 *	미팅 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("meetingService")
public class MeetingRoomServiceImpl implements MeetingRoomService {

	@Autowired
	MeetingRoomRepository meetingRoomRepository;
	
	@Override
	public void createMeetingRoom(int type, Long mainSessionId) throws Exception {
		// TODO Auto-generated method stub
		// main session
		try {
			MeetingRoom meetingRoom = new MeetingRoom();
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
	}

	@Override
	public void choiceAvatar() throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void finalChoice() throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<MeetingRoomUserRelation> finalChoiceResult() throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

}
