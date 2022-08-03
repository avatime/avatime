package com.ssafy.api.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

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

	private final SimpMessageSendingOperations simp;
	
	// 대기방 목록 갱신
	@MessageMapping("/getList")
	public void waitingRoom() {
		List<WaitingRoom> waitingRoom = waitingRoomService.findAll();
		// cnt_man, cnt_woman 쿼리 미작성
		List<WaitingRoomRes> waitingRoomList = new ArrayList<>();
		for (WaitingRoom wr : waitingRoom) {
			Gender gender = genderService.findById(wr.getId()).get();
			WaitingRoomRes w = WaitingRoomRes.builder()
					.name(wr.getName())
					.headCount(wr.getHeadCount())
					.status(wr.getStatus())
					.cntMan(gender.getM())
					.cntWoman(gender.getF())
					.sido(sidoService.findById(wr.getSidoId()).get().getName())
					.age(ageService.findById(wr.getAgeId()).get().getName())
					.build();
			waitingRoomList.add(w);
		}
		simp.convertAndSend("/topic/getList", waitingRoomList);
	}
	
	@MessageMapping("/waitingUser/{wrId}")
	public void waitingUser(@DestinationVariable Long wrId) {
		List<WaitingRoomUserRelation> wrur = waitingRoomUserRelationService.findByWaitingRoomIdAndType(wrId);
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
		simp.convertAndSend("/topic/waitingUser/" + wrId, wu);
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
	public ResponseEntity<ChattingRoom> create(
			@RequestBody @ApiParam(value = "대기방 생성시 정보", required = true) WaitingRoomPostReq value) {
		WaitingRoom waitingRoom = waitingRoomService.save(value);
		User user = userService.getUserByUserId(value.getUserId());
		waitingRoomUserRelationService.save(user, waitingRoom);
		ChattingRoom chattingRoom = chattingRoomService.saveByWaitingRoom(waitingRoom.getId());
		waitingRoom();
		return new ResponseEntity<ChattingRoom>(chattingRoom, HttpStatus.OK);
	}

	@PatchMapping("/start")
	@ApiOperation(value = "대기방이 미팅방으로 변경됨", notes = "미팅방을 생성합니다.")
	public Long start(
			@RequestBody @ApiParam(value = "미팅방을 만드려는 대기방 id", required = true) long waitingRoomId) throws Exception {
		WaitingRoom waitingRoom = waitingRoomService.findById(waitingRoomId).get();
		int status = 1;
		waitingRoom.setStatus(status);
		waitingRoom();
		// 이 때 접수처에 있는 잉여유저들 일괄 거절처리 해야함
		return meetingRoomService.createMeetingRoom(waitingRoomId);
	}
	
	@PostMapping("/state")
	@ApiOperation(value = "이용자가 타입을 변경하려는 요청", notes = "0: 방장, 1: 참가(수락), 2: 입장 신청 3: 신청 취소 4: 거절 5: 나가기")
	public ResponseEntity<?> state(@RequestBody @ApiParam(value = "유저의 타입 변경", required = true) StatePostReq value) {
		WaitingRoomUserRelation userState = waitingRoomUserRelationService.findBystate(value.getRoomId(), value.getUserId()).get();
		User user = userState.getUser();
		if(value.getType() == 1) { // 입장 가능한지 조사
			WaitingRoom room = userState.getWaitingRoom();
			Gender gender = genderService.findById(value.getRoomId()).get();
			if (user.getGender() == "M") {
				if (gender.getM() < room.getHeadCount() / 2) {
					userState.setType(value.getType());
					waitingRoom();
					result(value.getUserId(), true);
					return ResponseEntity.status(200).body(chattingRoomService.findByRoomIdAndType(value.getRoomId()).get().getId());
				}
				else {
					result(value.getUserId(), false);
					return ResponseEntity.status(409).body("");
				}
			}
			else {
				if (gender.getF() < room.getHeadCount() / 2) {
					userState.setType(value.getType());
					waitingRoom();
					result(value.getUserId(), true);
					return ResponseEntity.status(200).body(chattingRoomService.findByRoomIdAndType(value.getRoomId()).get().getId());
				}
				else {
					result(value.getUserId(), false);
					return ResponseEntity.status(409).body("");
				}
			}
		}
		else if(value.getType() == 4) {
			userState.setType(value.getType());
			result(user.getId(), false);
		}
		else {
			userState.setType(value.getType());
		}
		return null;
	}
	
	public void result(Long userId, Boolean x) {
		HashMap<String, Boolean> success = new HashMap<>();
		success.put("success", x);
		simp.convertAndSend("enter/result/" + userId, success);
	}
}
