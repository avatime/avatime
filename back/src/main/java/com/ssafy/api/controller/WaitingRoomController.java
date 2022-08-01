package com.ssafy.api.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.api.request.WaitingRoomPostReq;
import com.ssafy.api.response.WaitingRoomRes;
import com.ssafy.api.response.WaitingUserRes;
import com.ssafy.api.service.AgeService;
import com.ssafy.api.service.ChattingRoomService;
import com.ssafy.api.service.MeetingRoomService;
import com.ssafy.api.service.SidoService;
import com.ssafy.api.service.UserService;
import com.ssafy.api.service.WaitingRoomService;
import com.ssafy.api.service.WaitingRoomUserRelationService;
import com.ssafy.db.entity.Age;
import com.ssafy.db.entity.ChattingRoom;
import com.ssafy.db.entity.MeetingRoom;
import com.ssafy.db.entity.Sido;
import com.ssafy.db.entity.User;
import com.ssafy.db.entity.WaitingRoom;
import com.ssafy.db.entity.WaitingRoomUserRelation;

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

	private final SimpMessageSendingOperations simp;
	
	// 대기방 목록 갱신
	@MessageMapping("/getList")
	public void waitingRoom() {
		List<WaitingRoom> waitingRoom = waitingRoomService.findAll();
		// cnt_man, cnt_woman 쿼리 미작성
		List<WaitingRoomRes> waitingRoomList = new ArrayList<>();
		for (WaitingRoom wr : waitingRoom) {
			WaitingRoomRes w = WaitingRoomRes.builder()
					.name(wr.getName())
					.headCount(wr.getHeadCount())
					.status(wr.getStatus())
//					.cntMan()
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
	@ApiOperation(value = "대기방이 미팅방으로 변경", notes = "미팅방을 생성합니다.")
	public Long start(
			@RequestBody @ApiParam(value = "미팅방을 만드려는 대기방 id", required = true) long waitingRoomId) {
		WaitingRoom waitingRoom = waitingRoomService.findById(waitingRoomId).get();
		int status = 1;
		waitingRoom.setStatus(status);
		waitingRoom();
//		return meetingRoomService.createMeetingRoom(waitingRoomId);
		return null;
	}
	
	
}
