package com.ssafy.api.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatRoom {

	private Long chattingRoomId;
	private String name;
	
	public static ChatRoom create(Long no){
		ChatRoom room = new ChatRoom();
		room.chattingRoomId = no;
        room.name = no + "번째로 생성된 채팅방";
        return room;
    }
}
