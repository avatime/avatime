package com.ssafy.api.dto;

import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

import org.springframework.web.socket.WebSocketSession;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChattingRoomDto {

	private Long chattingRoomId;
	private Long roomId;
	private int type;
	private Date created_time;
	private String name;
	private Set<WebSocketSession> sessions = new HashSet<>();
	
	public static ChattingRoomDto create(String name){
		ChattingRoomDto room = new ChattingRoomDto();

        room.name = name;
        return room;
    }
}
