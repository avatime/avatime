package com.ssafy.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.api.service.SidoService;
import com.ssafy.api.service.WaitingService;
import com.ssafy.db.entity.Sido;
import com.ssafy.db.entity.WaitingRoom;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@Api(value = "미팅방 API", tags = {"waiting"})
@RestController
@RequestMapping("/api/v1/waiting")
public class WaitingController {
	
	@Autowired
	SidoService sidoService;
	
	@Autowired
	WaitingService waitingService;
	
	
	@GetMapping("")
	@ApiOperation(value = "대기방 목록 조회", notes = "대기방 전부 보여줌.")
	public ResponseEntity<List<WaitingRoom>> waitingRoom() {
		List<WaitingRoom> waitingRoom = waitingService.findAll();
		return new ResponseEntity<List<WaitingRoom>>(waitingRoom, HttpStatus.OK);
	}
	
	
	@GetMapping("/sido")
	@ApiOperation(value = "지역검색", notes = "지역목록 보여줌.")
	public ResponseEntity<List<Sido>> sido() {
		 List<Sido> sido = sidoService.findAll();
		return new ResponseEntity<List<Sido>>(sido, HttpStatus.OK);
		
	}
}
