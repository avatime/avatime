package com.ssafy.db.repository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import com.ssafy.api.dto.ChattingRoomDto;

public class ChattingRoomRepository {
	private Map<String, ChattingRoomDto> chatRoomDTOMap;

    @PostConstruct
    private void init(){
        chatRoomDTOMap = new LinkedHashMap<>();
    }

    public List<ChattingRoomDto> findAllRooms(){
        //채팅방 생성 순서 최근 순으로 반환
        List<ChattingRoomDto> result = new ArrayList<>(chatRoomDTOMap.values());
        Collections.reverse(result);

        return result;
    }

//    public ChattingRoomDto findRoomById(String id){
//        return chatRoomDTOMap.get(id);
//    }
//
//    public ChattingRoomDto createChatRoomDTO(String name){
//    	ChattingRoomDto room = ChattingRoomDto.create(name);
//        chatRoomDTOMap.put(room);
//
//        return room;
//    }
}
