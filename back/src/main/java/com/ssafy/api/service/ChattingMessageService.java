package com.ssafy.api.service;

import java.util.List;

import com.ssafy.db.entity.ChattingMessage;
import com.ssafy.db.entity.ChattingRoom;

public interface ChattingMessageService {

	public List<ChattingMessage> findAllByChattingRoom(ChattingRoom chattingRoom) throws Exception;
	public String findUserName(ChattingRoom chattingRoom, Long userId);
}
