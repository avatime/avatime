package com.ssafy.api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ssafy.db.entity.ChattingMessage;
import com.ssafy.db.entity.ChattingRoom;
import com.ssafy.db.repository.AvatarRepository;
import com.ssafy.db.repository.ChattingMessageRepository;
import com.ssafy.db.repository.MeetingRoomUserRelationRepository;
import com.ssafy.db.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service("ChattingMessageService")
@RequiredArgsConstructor
public class ChattingMessageServiceImpl implements ChattingMessageService {

	private final ChattingMessageRepository chattingMessageRepository;
	private final UserRepository userRepository;	
	private final MeetingRoomUserRelationRepository meetingRoomUserRelation;
	private final AvatarRepository avatarRepository;
	@Override
	public List<ChattingMessage> findAllByChattingRoom(ChattingRoom chattingRoom) throws Exception {
		// TODO Auto-generated method stub
		return chattingMessageRepository.findByChattingRoom_Id(chattingRoom.getId()).get() ;
	}
	@Override
	public String findUserName(ChattingRoom chattingRoom, Long userId) {
		// TODO Auto-generated method stub
		if(chattingRoom.getType() == 2) return userRepository.findById(userId).get().getName();
		else return avatarRepository.findById(meetingRoomUserRelation.findByMeetingRoomIdAndUserId(chattingRoom.getRoomId(), userId).get().getAvatarId()).get().getName();
	}
}
