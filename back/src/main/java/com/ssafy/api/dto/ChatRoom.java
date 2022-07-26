package com.ssafy.api.dto;

import java.util.HashSet;
import java.util.Set;

import org.springframework.web.socket.WebSocketSession;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatRoom {

	private Long chattingRoomId;
	private String name;
	private Set<WebSocketSession> sessions = new HashSet<>();
	
	public static ChatRoom create(String name){
		ChatRoom room = new ChatRoom();
		room.chattingRoomId = 1L;
        room.name = name;
        return room;
    }
}
