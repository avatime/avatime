package com.ssafy.api.controller;

import java.util.List;
import java.util.Map;

import org.apache.commons.collections4.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.api.request.ChattingRoomPostReq;
import com.ssafy.api.request.WaitingRoomPostReq;
import com.ssafy.api.service.ChattingRoomService;
import com.ssafy.api.service.SidoService;
import com.ssafy.api.service.WaitingRoomService;
import com.ssafy.api.service.WaitingRoomUserRelationService;
import com.ssafy.db.entity.ChattingRoom;
import com.ssafy.db.entity.MeetingRoom;
import com.ssafy.db.entity.Sido;
import com.ssafy.db.entity.User;
import com.ssafy.db.entity.WaitingRoom;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@Api(value = "미팅방 API", tags = {"waiting"})
@RestController
@RequestMapping("/api/v1/waiting")
public class WaitingRoomController {
	
	@Autowired
	SidoService sidoService;
	
	@Autowired
	WaitingRoomService waitingRoomService;
	
	@Autowired
	WaitingRoomUserRelationService waitingRoomUserRelationService;
	
	@Autowired
	ChattingRoomService chattingRoomService;
	
	
	@GetMapping("")
	@ApiOperation(value = "대기방 목록 조회", notes = "대기방 전부 보여줌.")
	public ResponseEntity<List<WaitingRoom>> waitingRoom() {
		List<WaitingRoom> waitingRoom = waitingRoomService.findAll();
		// cnt_man, cmt_woman 쿼리 미작성
		return new ResponseEntity<List<WaitingRoom>>(waitingRoom, HttpStatus.OK);
	}
	
	@GetMapping("/sido")
	@ApiOperation(value = "지역검색", notes = "지역목록 보여줌.")
	public ResponseEntity<List<Sido>> sido() {
		 List<Sido> sido = sidoService.findAll();
		return new ResponseEntity<List<Sido>>(sido, HttpStatus.OK);
		
	}
	
	@PostMapping("/create")
	@ApiOperation(value = "대기방 생성", notes = "대기방을 생성합니다.")
	public ResponseEntity<ChattingRoom> create(@RequestBody @ApiParam(value="대기방 생성시 정보", required = true) WaitingRoomPostReq value) {
		Map<String, Long> userRelation = new HashedMap<>();
		WaitingRoom waitingRoom = waitingRoomService.save(value);
		userRelation.put("user_id", value.getUser_id());
		waitingRoomUserRelationService.save(userRelation, waitingRoom);
		ChattingRoomPostReq chatValue = new ChattingRoomPostReq();
		chatValue.setRoom_id(waitingRoom.getId());
		ChattingRoom chattingRoom = chattingRoomService.saveByWaitingRoom(chatValue);
		return new ResponseEntity<ChattingRoom>(chattingRoom, HttpStatus.OK);
	}
	
	@PatchMapping("/start")
	@ApiOperation(value = "대기방이 미팅방으로 변경", notes = "미팅방을 생성합니다.")
	public ResponseEntity<MeetingRoom> start(@RequestBody @ApiParam(value="미팅방을 만드려는 대기방 id", required = true) long waitingRoomId) {
		// 아직 안함
		return null;
	}
}
