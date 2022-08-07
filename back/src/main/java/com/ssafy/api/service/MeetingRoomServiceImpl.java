package com.ssafy.api.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

import com.ssafy.api.response.MeetingRoomInfoRes;
import com.ssafy.api.response.entity.StreamUser;
import com.ssafy.db.entity.ChattingRoom;
import com.ssafy.db.entity.MeetingRoom;
import com.ssafy.db.entity.MeetingRoomUserRelation;
import com.ssafy.db.entity.WaitingRoomUserRelation;
import com.ssafy.db.repository.ChattingRoomRepository;
import com.ssafy.db.repository.MeetingRoomRepository;
import com.ssafy.db.repository.MeetingRoomUserRelationRepository;
import com.ssafy.db.repository.WaitingRoomUserRelationRepository;

import lombok.RequiredArgsConstructor;

/**
 *	미팅 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@RequiredArgsConstructor
@Service("meetingService")
public class MeetingRoomServiceImpl implements MeetingRoomService {

	@Autowired
	MeetingRoomRepository meetingRoomRepository;
	
	@Autowired
	MeetingRoomUserRelationRepository meetingRoomUserRelationRepository;
	
	@Autowired
	WaitingRoomUserRelationRepository waitingRoomUserRelationRepository;
	
	@Autowired
	ChattingRoomRepository chattingRoomRepository;
	
	@Autowired
	ChattingRoomService chattingRoomService;
	
	@Autowired
	AvatarService avatarService;
	
	private final SimpMessageSendingOperations sendingOperations;
	
	@Override
	public MeetingRoom createMeetingRoomSession(int type, Long mainSessionId) throws Exception {
		// TODO Auto-generated method stub
		// main session
		MeetingRoom meetingRoom = new MeetingRoom();
		try {
			meetingRoom.setType(type);
			if(type == 0) {
				mainSessionId = meetingRoomRepository.save(meetingRoom).getId();
				chattingRoomService.createRoomInMeetingRoom(mainSessionId);
			}
			else if(type == 1) {
				
			}
			meetingRoom.setMainSessionId(mainSessionId);
//			meetingRoomRepository.save(meetingRoom);
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
		MeetingRoomUserRelation pickedUserInfo = meetingRoomUserRelationRepository.findByMeetingRoomIdAndUserId(meetingRoomId, pickUserId).get();
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
		return meetingRoomUserRelationRepository.findAllByMeetingRoomIdAndLeftMeeting(meetingRoomId, false);
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
		List<WaitingRoomUserRelation> list = waitingRoomUserRelationRepository.findByWaitingRoomId(waitingRoomId);
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

	private int count;
	@Override
	public void timer(Long meetingRoomId, int time, String type) throws Exception {
		// TODO Auto-generated method stub
		if(type.equals("pick")) {
			MeetingRoom meetingRoom = meetingRoomRepository.findById(meetingRoomId).get();
			meetingRoom.setStatus(1);
			meetingRoomRepository.save(meetingRoom);
		}
		count = time;
		Timer timer = new Timer();
		TimerTask task = new TimerTask() {
			@Override
			public void run() {
				if(count > 0) {
			    	try { sendingOperations.convertAndSend("topic/meeting/"+type+"/timer"+meetingRoomId, count);}
			    	catch(Exception e) {}
					count--;
				} else {
					timer.cancel();
					if(type.equals("avatar"))
						try {
							sendMeetingRoomInfo(meetingRoomId);
						} catch (Exception e) {
							// TODO Auto-generated catch block
							
						}
				}
			}
		};
		
		timer.schedule(task, 1000, 1000);
	}
	
	@Override
	public int userNumber(Long meetingRoomId) throws Exception {
		// TODO Auto-generated method stub
		return meetingRoomUserRelationRepository.countByMeetingRoomIdAndLeftMeeting(meetingRoomId, false);
	}
	
	@Override
	public MeetingRoomUserRelation findUser(Long meetingRoomId, Long userId) {
		// TODO Auto-generated method stub
		return meetingRoomUserRelationRepository.findByMeetingRoomIdAndUserId(meetingRoomId, userId).get();
	}

	@Override
	public void save(MeetingRoomUserRelation meetingRoomUserRelation) {
		// TODO Auto-generated method stub
		meetingRoomUserRelationRepository.save(meetingRoomUserRelation);
	}
	
	@Override
	public void sendMeetingRoomInfo(Long meetingRoomId) throws Exception {
		// TODO Auto-generated method stub
		MeetingRoomInfoRes meetingRoomInfo = new MeetingRoomInfoRes();
		meetingRoomInfo.setCreated_time(meetingRoomRepository.findById(meetingRoomId).get().getCreatedTime().toString());
		meetingRoomInfo.setChattingroom_id(chattingRoomService.findByRoomIdAndType(meetingRoomId, 0).getId());
		List<ChattingRoom> chatList = chattingRoomRepository.findAllByRoomId(meetingRoomId).get();
		meetingRoomInfo.setMen_chattingroom_id(chatList.get(0).getId());
		meetingRoomInfo.setWomen_chattingroom_id(chatList.get(1).getId());
		meetingRoomInfo.setLast_pick_status(meetingRoomRepository.findById(meetingRoomId).get().getStatus() == 1);
		List<MeetingRoomUserRelation> userList = meetingRoomUserRelationRepository.findAllByMeetingRoomIdAndLeftMeeting(meetingRoomId, false);
		List<StreamUser> list = new ArrayList<>();
		
		for(MeetingRoomUserRelation user : userList) {
			if(user.getAvatarId() == null) {
				for(Long avatarId = 1L; avatarId<= avatarService.findAll().size(); avatarId++) {
					if(!isSelectedAvatar(meetingRoomId, avatarId)) {
						user.setAvatarId(avatarId);
						meetingRoomUserRelationRepository.save(user);
						break;
					}
				}
			}
			StreamUser su = StreamUser.builder()
					.user_id(user.getUser().getId())
					.user_name(user.getUser().getName())
					.avatar_id(user.getAvatarId())
					.avatar_name(avatarService.findById(user.getAvatarId()).getName())
					.avatar_image_path(avatarService.findById(user.getAvatarId()).getImagePath())
					.build();
			list.add(su);
		}
		
		meetingRoomInfo.setStream_list(list);
		
		sendingOperations.convertAndSend("topic/meeting/"+meetingRoomId, meetingRoomInfo);
	}

	@Override
	public MeetingRoom findById(Long meetingRoomId) {
		// TODO Auto-generated method stub
		return meetingRoomRepository.findById(meetingRoomId).get();
	}

}
