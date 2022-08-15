package com.ssafy.api.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.api.request.StatePostReq;
import com.ssafy.api.request.WaitingRoomPostReq;
import com.ssafy.api.request.WaitingRoomStartReq;
import com.ssafy.api.response.WaitingRoomRes;
import com.ssafy.api.response.WaitingUserRes;
import com.ssafy.api.service.AgeService;
import com.ssafy.api.service.ChattingRoomService;
import com.ssafy.api.service.GenderService;
import com.ssafy.api.service.MeetingRoomService;
import com.ssafy.api.service.SidoService;
import com.ssafy.api.service.UserService;
import com.ssafy.api.service.WaitingRoomService;
import com.ssafy.api.service.WaitingRoomUserRelationService;
import com.ssafy.db.entity.Age;
import com.ssafy.db.entity.ChattingRoom;
import com.ssafy.db.entity.Sido;
import com.ssafy.db.entity.User;
import com.ssafy.db.entity.WaitingRoom;
import com.ssafy.db.entity.WaitingRoomUserRelation;
import com.ssafy.db.repository.UserRepository;
import com.ssafy.db.repository.WaitingRoomUserRelationRepository;
import com.ssafy.db.entity.Gender;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;

@Api(value = "미팅방 API", tags = { "waiting" })
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/waiting")
public class WaitingRoomController {
	
	@Autowired
	private final SidoService sidoService;
	
	@Autowired
	private final UserService userService;
	
	@Autowired
	private final WaitingRoomService waitingRoomService;

	@Autowired
	private final WaitingRoomUserRelationService waitingRoomUserRelationService;

	@Autowired
	private final ChattingRoomService chattingRoomService;
	
	@Autowired
	private final MeetingRoomService meetingRoomService;
	
	@Autowired
	private final AgeService ageService;
	
	@Autowired
	private final GenderService genderService;
	
	@Autowired
	private final WaitingRoomUserRelationRepository wrurRepository;
	
	@Autowired
	private final UserRepository userRepository;

	private final SimpMessageSendingOperations simp;
	
	// 대기방 목록 갱신
	@MessageMapping("/getList")
	public ResponseEntity<?> waitingRoom() {
		try {
			List<WaitingRoom> waitingRoom = waitingRoomService.findAll();
			List<WaitingRoomRes> waitingRoomList = new ArrayList<>();
			for (WaitingRoom wr : waitingRoom) {
				Gender gender = genderService.findById(wr.getId()).orElse(null);
				if (gender != null) {
					User user = waitingRoomUserRelationService.findByWaitingRoomIdAndType(wr.getId(), 0).get(0).getUser();
					WaitingRoomRes w = WaitingRoomRes.builder()
							.id(wr.getId())
							.name(wr.getName())
							.headCount(wr.getHeadCount())
							.status(wr.getStatus())
							.cntMan(gender.getM())
							.cntWoman(gender.getF())
							.sido(sidoService.findById(wr.getSidoId()).get().getName())
							.age(ageService.findById(wr.getAgeId()).get().getName())
							.imagePath(user.getProfileImagePath())
							.createdTime(wr.getCreatedTime())
							.build();
					waitingRoomList.add(w);
				}
			}
			simp.convertAndSend("/topic/getList", waitingRoomList);
			return ResponseEntity.status(200).body("");
		}
		catch(Exception e) {
    		return ResponseEntity.status(500).body(e);
    	}
	}
	

	@MessageMapping("/waiting/info/{wrId}")
	public void info(@DestinationVariable Long wrId) {
		info(wrId, -1L);
	}
	
	public ResponseEntity<?> info(Long wrId, Long mrId) {
		try {
			WaitingRoom wr = waitingRoomService.findById(wrId).get();
			HashMap<String, Object> map = new HashMap<>();
			map.put("status", wr.getStatus());
			List<Object> userList = new ArrayList<>();
			List<WaitingRoomUserRelation> info = wrurRepository.findByWaitingRoomId(wrId);
			for (WaitingRoomUserRelation wrur : info) {
				if (wrur.getType() == 0 || wrur.getType() == 1 ) {
					HashMap<String, Object> user = new HashMap<>();
					User pariticipant = wrur.getUser();
					user.put("id", pariticipant.getId());
					user.put("type", wrur.getType());
					user.put("name", pariticipant.getName());
					user.put("gender", pariticipant.getGender());
					user.put("profile_img_path", pariticipant.getProfileImagePath());
					userList.add(user);
				}
			}
			map.put("user_list", userList);
			if (mrId != -1) {
				map.put("meeting_room_id", mrId);
			}
			simp.convertAndSend("/topic/waiting/info/" + wrId, map);
			return ResponseEntity.status(200).body("");
		}
		catch(Exception e) {
    		return ResponseEntity.status(500).body(e);
    	}
	}
	
	@MessageMapping("/reception/{wrId}")
	public ResponseEntity<?> reception(@DestinationVariable Long wrId) {
		try {
			List<WaitingRoomUserRelation> wrur = waitingRoomUserRelationService.findByWaitingRoomIdAndType(wrId, 2);
			List<WaitingUserRes> wu = new ArrayList<>();
			for(WaitingRoomUserRelation wr : wrur) {
				User user = wr.getUser();
				WaitingUserRes wur = WaitingUserRes.builder()
						.id(user.getId())
						.name(user.getName())
						.gender(user.getGender())
						.profileImgPath(user.getProfileImagePath()).build();
				wu.add(wur);
			}
			simp.convertAndSend("/topic/reception/" + wrId, wu);
			return ResponseEntity.status(200).body("");
		}
		catch(Exception e) {
    		return ResponseEntity.status(500).body(e);
    	}
	}

	@GetMapping("/sido")
	@ApiOperation(value = "지역검색", notes = "지역목록 보여줌.")
	public ResponseEntity<List<Sido>> sido() {
		List<Sido> sido = sidoService.findAll();
		return new ResponseEntity<List<Sido>>(sido, HttpStatus.OK);
	}

	@GetMapping("/age")
	@ApiOperation(value = "연령범주검색")
	public ResponseEntity<List<Age>> age() {
		List<Age> age = ageService.findAll();
		return new ResponseEntity<List<Age>>(age, HttpStatus.OK);
	}
	
	@PostMapping("/create")
	@ApiOperation(value = "대기방 생성", notes = "대기방을 생성합니다.")
	public ResponseEntity<?> create(
			@RequestBody @ApiParam(value = "대기방 생성시 정보", required = true) WaitingRoomPostReq value) {
		try {
			WaitingRoom waitingRoom = waitingRoomService.save(value);
			User user = userService.getUserByUserId(value.getUserId());
			waitingRoomUserRelationService.save(0, user, waitingRoom);
			ChattingRoom chattingRoom = chattingRoomService.saveByWaitingRoom(waitingRoom.getId());
			waitingRoom();
			HashMap<String, Long> response = new HashMap<>();
			response.put("chatting_room_id", chattingRoom.getId());
			response.put("waiting_room_id", chattingRoom.getRoomId());
			return new ResponseEntity<HashMap<String, Long>>(response, HttpStatus.OK);
		}
		catch(Exception e) {
    		return ResponseEntity.status(500).body(e);
    	}
	}

	@PatchMapping("/start")
	@ApiOperation(value = "대기방이 미팅방으로 변경됨", notes = "미팅방을 생성합니다.")
	public ResponseEntity<?> start(
			@RequestBody @ApiParam(value = "미팅방을 만드려는 대기방 id", required = true) WaitingRoomStartReq waitingRoomStartReq) throws Exception {
		try {
			WaitingRoom waitingRoom = waitingRoomService.findById(waitingRoomStartReq.getWaitingRoomId()).get();
			int status = 1;
			waitingRoom.setStatus(status);
			List<WaitingRoomUserRelation> wrur = waitingRoomUserRelationService.findByWaitingRoomIdAndType(waitingRoomStartReq.getWaitingRoomId(), 2);
			if (CollectionUtils.isNotEmpty(wrur)) {
				for (WaitingRoomUserRelation person : wrur) {    // 남아있는 접수처, 일괄 거절처리
					person.setType(4);
					wrurRepository.saveAndFlush(person);
				}
			}
			
			waitingRoom();
			
			long meetingRoomId = meetingRoomService.createMeetingRoom(waitingRoomStartReq.getWaitingRoomId());
			info(waitingRoomStartReq.getWaitingRoomId(), meetingRoomId);
			meetingRoomService.timer(meetingRoomId, 30, "avatar");
			return ResponseEntity.status(200).body("");
		}
		catch(Exception e) {
    		return ResponseEntity.status(500).body(e);
    	}
	}
	
	@PostMapping("/state")
	@ApiOperation(value = "이용자의 타입을 변경하려는 요청", notes = "0: 방장, 1: 참가(수락), 2: 입장 신청 3: 신청 취소 4: 거절 5: 나가기")
	public ResponseEntity<?> state(@RequestBody @ApiParam(value = "유저의 타입 변경", required = true) StatePostReq value) {
		try {
			WaitingRoomUserRelation userState = waitingRoomUserRelationService.findBystate(value.getRoomId(), value.getUserId()).orElse(null);
			if (userState != null) {
				User user = userState.getUser();
				
				if(value.getType() == 1) { // 입장 가능한지 조사
					WaitingRoom room = userState.getWaitingRoom();
					Gender gender = genderService.findById(value.getRoomId()).get();
					HashMap<String, Long> response = new HashMap<>();
					if ((user.getGender().equals("M") && gender.getM() < room.getHeadCount() / 2) || (user.getGender().equals("F") && gender.getF() < room.getHeadCount() / 2)) {
						userState.setType(value.getType());
						wrurRepository.saveAndFlush(userState);
						waitingRoom();
						reception(value.getRoomId());
						info(value.getRoomId());
						ChattingRoom chattingRoom = chattingRoomService.findByRoomIdAndType(value.getRoomId(), 2);
						result(value.getUserId(), true, chattingRoom.getId());
						response.put("chatting_room_id", chattingRoom.getId());
						response.put("waiting_room_id", value.getRoomId());
						return ResponseEntity.status(200).body(response);
					}
					else {
						result(value.getUserId(), false);
						return ResponseEntity.status(409).body("");
					}
				}
				else {    // 입장 이외의 모든 사항
					int pastType = userState.getType();
					userState.setType(value.getType());
					wrurRepository.saveAndFlush(userState);
					if (value.getType() == 2 || value.getType() == 3 || value.getType() == 4) {
						reception(value.getRoomId());
					}
					if (value.getType() == 5) {
						if (pastType == 0) {    // 나간 사람이 하필 방장이면
							List<WaitingRoomUserRelation> wrur = waitingRoomUserRelationService.findByWaitingRoomIdAndType(value.getRoomId(), 1);
							if (CollectionUtils.isNotEmpty(wrur)) {
								WaitingRoomUserRelation relation = wrur.get(0);
								relation.setType(0);
								wrurRepository.saveAndFlush(relation);
							}
						}
						info(value.getRoomId());
					}
					if (value.getType() == 4) {
						result(user.getId(), false);
					}
				}
			}
			else {
				waitingRoomUserRelationService.save(value.getType(), userRepository.findById(value.getUserId()).get(), waitingRoomService.findById(value.getRoomId()).get());
	            reception(value.getRoomId());
			}
			waitingRoom();
			return ResponseEntity.status(200).body("");
		}
		catch(Exception e) {
    		return ResponseEntity.status(500).body(e);
    	}
	}
	
	public ResponseEntity<?> result(Long userId, Boolean x, long chatRoomId) {
		try {
			HashMap<String, Object> map = new HashMap<>();
			map.put("success", x);
			map.put("chatting_room_id", chatRoomId);
			simp.convertAndSend("/topic/enter/result/" + userId, map);
			return ResponseEntity.status(200).body("");
		}
		catch(Exception e) {
    		return ResponseEntity.status(500).body(e);
    	}
	}
	
	public ResponseEntity<?> result(Long userId, Boolean x) {
		try {
			HashMap<String, Boolean> success = new HashMap<>();
			success.put("success", x);
			simp.convertAndSend("/topic/enter/result/" + userId, success);
			return ResponseEntity.status(200).body("");
		}
		catch(Exception e) {
    		return ResponseEntity.status(500).body(e);
    	}
	}
}
