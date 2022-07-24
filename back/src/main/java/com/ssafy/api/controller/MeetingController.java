package com.ssafy.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.api.request.MeetingRoomPostReq;
import com.ssafy.api.request.UserSelectAvatar;
import com.ssafy.api.response.FinalChoiceRes;
import com.ssafy.api.service.MeetingRoomService;
import com.ssafy.common.model.response.BaseResponseBody;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

/**
 * 인증 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "미팅방 관련 API", tags = {"Meeting."})
@RestController
@RequestMapping("/api/v1/meeting")
public class MeetingController {
	
	@Autowired
	MeetingRoomService meetingRoomService;

	@PostMapping()
	@ApiOperation(value = "미팅방 생성", notes = "<strong>미팅방 생성</strong>") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공", response = BaseResponseBody.class),
        @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
	public ResponseEntity<?> createMeetingRoom(@RequestBody @ApiParam(value="미팅방 정보", required = true) MeetingRoomPostReq meetingRoomPostReq) {
		int type = meetingRoomPostReq.getType();
		Long mainSessionId = meetingRoomPostReq.getMainSessionId();
		
		try {
			meetingRoomService.createMeetingRoom(type, mainSessionId);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			return ResponseEntity.status(500).body("");
		}
		return ResponseEntity.status(200).body("");
	}
	
	@PatchMapping("/pick/result/selectAvatar")
	@ApiOperation(value = "아바타 선택", notes = "<strong>유저별 아바타 선택</strong>") 
    @ApiResponses({
        @ApiResponse(code = 201, message = "성공", response = BaseResponseBody.class),
        @ApiResponse(code = 409, message = "다른 유저가 먼저 선택한 아바타입니다", response = BaseResponseBody.class),
        @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
	public ResponseEntity<?> choiceAvatar(@RequestBody @ApiParam(value="유저 아이디와 아바타 아이디", required = true) UserSelectAvatar userSelectAvatar) {
		
//		try {
//			Long MeetingRoomId = meetingRoomService.findRoomByUserId();
//			if(meetingRoomService.isSelectedAvatar()) return ResponseEntity.status(409).body("");
//			else meetingRoomService.choiceAvatar();
//		} catch(Exception e) {
//			return ResponseEntity.status(500).body("");
//		}
		return ResponseEntity.status(200).body("");
	}
	
	@PatchMapping("/pick/result/pick")
	@ApiOperation(value = "최종 선택", notes = "<strong>meeting room id</strong>에 따른 미팅 최종 결과") 
    @ApiResponses({
        @ApiResponse(code = 201, message = "성공", response = BaseResponseBody.class),
        @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
	public ResponseEntity<?> finalChoice(@RequestBody @ApiParam(value="미팅방 정보", required = true) int meetingroom_id) {
		
		try {
			meetingRoomService.finalChoice();
		} catch(Exception e) {
			return ResponseEntity.status(500).body("");
		}
		
		return ResponseEntity.status(200).body("");
	}
	
	@GetMapping("/pick/result/{meetingroom_id}")
	@ApiOperation(value = "최종 결과", notes = "<strong>meeting room id</strong>에 따른 미팅 최종 결과") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공", response = BaseResponseBody.class),
        @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
	public ResponseEntity<?> finalMeetingResult(@RequestBody @ApiParam(value="미팅방 정보", required = true) int meetingroom_id) {
		
		
		return ResponseEntity.status(200).body(FinalChoiceRes.of(meetingroom_id));
	}
}
