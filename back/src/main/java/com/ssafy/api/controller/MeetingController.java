package com.ssafy.api.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.api.request.FinalChoiceUserReq;
import com.ssafy.api.request.LeavingMeetingRoomReq;
import com.ssafy.api.request.RegisterOpenViduStreamReq;
import com.ssafy.api.request.UserSelectAvatarReq;
import com.ssafy.api.response.AvatarChoiceRes;
import com.ssafy.api.response.FinalChoiceRes;
import com.ssafy.api.response.LastPickStatusRes;
import com.ssafy.api.response.MeetingRoomInfoRes;
import com.ssafy.api.response.MeetingRoomUserRes;
import com.ssafy.api.response.entity.AvatarStatus;
import com.ssafy.api.response.entity.Result;
import com.ssafy.api.service.AvatarService;
import com.ssafy.api.service.ChattingRoomService;
import com.ssafy.api.service.MeetingRoomService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Avatar;
import com.ssafy.db.entity.ChattingRoom;
import com.ssafy.db.entity.MeetingRoom;
import com.ssafy.db.entity.MeetingRoomUserRelation;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.UserRepository;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;

/**
 * 인증 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "미팅방 관련 API", tags = {"Meeting."})
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/meeting")
public class MeetingController {
	private final SimpMessageSendingOperations sendingOperations;	
	
	@Autowired
	MeetingRoomService meetingRoomService;
	
	@Autowired
	ChattingRoomService chattingRoomService;
	
	@Autowired
//	UserService userService;
	UserRepository userRepository;
	
	@Autowired
	AvatarService avatarService;
	
	@PatchMapping("/pick/result/selectAvatar")
	@ApiOperation(value = "아바타 선택", notes = "<strong>유저별 아바타 선택</strong>") 
    @ApiResponses({
        @ApiResponse(code = 201, message = "성공", response = BaseResponseBody.class),
        @ApiResponse(code = 409, message = "다른 유저가 먼저 선택한 아바타입니다", response = BaseResponseBody.class),
        @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
	public ResponseEntity<?> choiceAvatar(@RequestBody @ApiParam(value="유저 아이디와 아바타 아이디", required = true) UserSelectAvatarReq userSelectAvatar) {
		Long meetingRoomId = userSelectAvatar.getMeetingRoomId();
		Long userId = userSelectAvatar.getUserId();
		Long avatarId = userSelectAvatar.getAvatarId();
		
		try {
			if(meetingRoomService.isSelectedAvatar(meetingRoomId, avatarId)) return ResponseEntity.status(409).body("");
			else meetingRoomService.choiceAvatar(meetingRoomId, userId, avatarId);
			
			sendAvatarInfo(meetingRoomId);
			
		} catch(Exception e) {
			return ResponseEntity.status(500).body("");
		}
		
		return ResponseEntity.status(201).body("");
	}
	
	@MessageMapping("/meeting/avatar/{meetingRoomId}")
	public void startAvatarChoice(@DestinationVariable Long meetingRoomId) throws Exception {
		sendAvatarInfo(meetingRoomId);
		meetingRoomService.timer(meetingRoomId, 30, "avatar");
		sendAvatarInfo(meetingRoomId);
	}
	
	public int sendAvatarInfo(Long meetingRoomId) throws Exception {
		int num = 0;
		AvatarChoiceRes avatarChoiceRes = new AvatarChoiceRes();
		List<Avatar> avatarList = avatarService.findAll();
		List<AvatarStatus> list = new ArrayList<>();
		
		for(Avatar ava : avatarList) {
			AvatarStatus avasta = new AvatarStatus(ava);
			if(meetingRoomService.isSelectedAvatar(meetingRoomId, ava.getId())) {
				avasta.setSelected(true);
				num++;
			}
			else avasta.setSelected(false);
			list.add(avasta);
		}
		avatarChoiceRes.setStatus(num == meetingRoomService.userNumber(meetingRoomId) ? 1 : 0);
		avatarChoiceRes.setAvatar_list(list);
		
    	sendingOperations.convertAndSend("/topic/meeting/avatar/"+meetingRoomId, avatarChoiceRes);
    	return avatarChoiceRes.getStatus();
	}
	
	@GetMapping("/{meetingroom_id}")
	@ApiOperation(value = "미팅룸 정보 반환", notes = "<strong>meeting room id</strong>에 따른 미팅방 정보 반환") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공", response = BaseResponseBody.class),
        @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
	public ResponseEntity<?> getMeetingRoomInfo(@PathVariable Long meetingroom_id) {
		try {
			MeetingRoom meetingRoom = meetingRoomService.findById(meetingroom_id);
			List<ChattingRoom> chatList = chattingRoomService.findAllByRoomId(meetingroom_id);
			MeetingRoomInfoRes meetingRoomInfoRes = MeetingRoomInfoRes.builder()
					.created_time(meetingRoom.getCreatedTime().toString())
					.chattingroom_id(chattingRoomService.findByRoomIdAndType(meetingroom_id, 0).getId())
					.men_chattingroom_id(chatList.get(0).getId())
					.women_chattingroom_id(chatList.get(1).getId())
					.build();
			return ResponseEntity.status(200).body(meetingRoomInfoRes);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			return ResponseEntity.status(500).body("");
		}
	}

	@PatchMapping("/pick/result/pick")
	@ApiOperation(value = "최종 선택", notes = "<strong>meeting room id</strong>에 따른 미팅 최종 결과") 
    @ApiResponses({
        @ApiResponse(code = 201, message = "성공", response = BaseResponseBody.class),
        @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
	public ResponseEntity<?> finalChoice(@RequestBody @ApiParam(value="최종 선택을 결정한 유저 정보", required = true) FinalChoiceUserReq finalChoiceUserReq) {
		Long meetingRoomId = finalChoiceUserReq.getMeetingRoomId();
		Long userId = finalChoiceUserReq.getUserId();
		Long pickedUserId = finalChoiceUserReq.getPickUserId();
		try {
			meetingRoomService.finalChoice(meetingRoomId, userId, pickedUserId);
		} catch(Exception e) {
			return ResponseEntity.status(500).body("");
		}
		
		return ResponseEntity.status(200).body("");
	}
	 
	@GetMapping("/pick/result/{meetingroomId}")
	@ApiOperation(value = "최종 결과", notes = "<strong>meeting room id</strong>에 따른 미팅 최종 결과") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공", response = BaseResponseBody.class),
        @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
	public ResponseEntity<?> finalMeetingResult(@PathVariable Long meetingroomId) {
		FinalChoiceRes finalChoiceRes = new FinalChoiceRes();
		List<Result> list = new ArrayList<>();
		System.out.println(meetingroomId);
		try {
			List<MeetingRoomUserRelation> meetingRoomUserlist = meetingRoomService.finalChoiceResult(meetingroomId);
			boolean matched = false;
			for(MeetingRoomUserRelation m : meetingRoomUserlist) {
				if(m.isMatched()) matched = true;
				User user = userRepository.findById(m.getId()).get();
				Avatar avatar = avatarService.findById(m.getAvatarId());
				Result res = Result.builder()
						.id(user.getId())
						.name(user.getName())
						.gender(user.getGender())
						.avatar_id(avatar.getId())
						.avatar_name(avatar.getName())
						.avatar_image_path(avatar.getImagePath())
						.pick_user_id(m.getPickUserId())
						.build();
				list.add(res);
			}
			finalChoiceRes.setMatched(matched);
			finalChoiceRes.setMeetingroom_id(meetingroomId);
			finalChoiceRes.setResult_list(list);
		} catch (Exception e) {
			return ResponseEntity.status(500).body("");
		}
		return ResponseEntity.status(200).body(FinalChoiceRes.of(200, "최종 결과 불러오기 성공", finalChoiceRes));
	}
	
	@PostMapping("/pick/result")
	@ApiOperation(value = "최종 선택 시작", notes = "<strong>meeting room id</strong>방에서 최종 선택 시작") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공", response = BaseResponseBody.class),
        @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
	public ResponseEntity<?> finalPickStart(@RequestBody @ApiParam(value="미팅방 정보", required = true) Long meetingRoomId) throws Exception {
		try {
			MeetingRoom meetingRoom = meetingRoomService.findById(meetingRoomId);
			meetingRoom.setStatus(1);
			meetingRoomService.save(meetingRoom);
			sendLastPickStatus(meetingRoomId);
			meetingRoomService.timer(meetingRoomId, 15, "pick");
			return ResponseEntity.status(201).body("성공");
		}
		catch(Exception e) {
			return ResponseEntity.status(500).body("서버 오류");
		}
	}
	
	@MessageMapping("meeting/leave")
	public void leavingMeeting(LeavingMeetingRoomReq leavingMeetingRoomReq) throws Exception {
		MeetingRoomUserRelation meetingRoomUser = meetingRoomService.findUser(leavingMeetingRoomReq.getMeetingRoomId(), leavingMeetingRoomReq.getUserId());
		meetingRoomUser.setLeftMeeting(true);
		meetingRoomService.save(meetingRoomUser);
	}
	
	@GetMapping("/{meetingroom_id}/{stream_id}")
	@ApiOperation(value = "유저 정보 반환", notes = "<strong>meeting room id</strong> 와  <strong>stream id </strong>에 따른 유저 정보 반환") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공", response = MeetingRoomUserRes.class),
        @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
	public ResponseEntity<?> getMeetingRoomInfo(@PathVariable Long meetingroom_id, Long stream_id) {
		try {
			MeetingRoomUserRelation meetingRoomUserRelation = meetingRoomService.findByMeetingRoomIdAndStreamId(meetingroom_id, stream_id);
			Avatar avatar = avatarService.findById(meetingRoomUserRelation.getAvatarId());
			MeetingRoomUserRes meetingRoomUserRes = MeetingRoomUserRes.builder()
					.user_id(meetingRoomUserRelation.getUser().getId())
					.user_name(meetingRoomUserRelation.getUser().getName())
					.avatar_id(avatar.getId())
					.avatar_name(avatar.getName())
					.avatar_image_path(avatar.getImagePath())
					.gender(meetingRoomUserRelation.getUser().getGender())
					.build();
			return ResponseEntity.status(200).body(meetingRoomUserRes);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			return ResponseEntity.status(500).body("");
		}
	}
	
	@PatchMapping("/registerStream")
	@ApiOperation(value = "오픈비두 스트림 아이디 등록", notes = "<strong>오픈비두 스트림 아이디</strong> 등록") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공", response = BaseResponseBody.class),
        @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
	public ResponseEntity<?> registerOpenViduStreamId(@RequestBody @ApiParam(value="미팅룸, 유저 아이디와 등록할 오픈비두 스트림 ID", required = true) RegisterOpenViduStreamReq registerOpenViduStreamReq) {
		
		try {
			MeetingRoomUserRelation meetingRoomUserRelation = meetingRoomService.findUser(registerOpenViduStreamReq.getMeetingroom_id(), registerOpenViduStreamReq.getUser_id());
			meetingRoomUserRelation.setStreamId(registerOpenViduStreamReq.getStream_id());
			meetingRoomService.save(meetingRoomUserRelation);
			return ResponseEntity.status(200).body("성공");
			
		} catch(Exception e) {
			return ResponseEntity.status(500).body("서버 오류");
		}
	}
	
	@MessageMapping("/meeting/status")
	public void LastPickStatus(@DestinationVariable Long meetingRoomId) {
		sendLastPickStatus(meetingRoomId);
	}
	
	public void sendLastPickStatus(Long meetingRoomId) {
		MeetingRoom meetingRoom = meetingRoomService.findById(meetingRoomId);
		LastPickStatusRes lastPickStatusRes = new LastPickStatusRes();
		lastPickStatusRes.setLast_pick_status(meetingRoom.getStatus() == 1);
		sendingOperations.convertAndSend("/topic/meeting/status/"+meetingRoomId, lastPickStatusRes);
	}
}
