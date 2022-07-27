package com.ssafy.api.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.springframework.stereotype.Service;

import com.ssafy.api.dto.ChatRoom;
import com.ssafy.db.entity.ChattingRoom;
import com.ssafy.db.repository.ChattingRoomRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class ChatService {

    private Map<Long, ChatRoom> chatRooms;
    private Long no = 0L;
    private ChattingRoomRepository chattingRoomRepository;

    @PostConstruct
    //의존관게 주입완료되면 실행되는 코드
    private void init() {
        chatRooms = new LinkedHashMap<>();
    }

    //채팅방 불러오기
    public List<ChatRoom> findAllRoom() {
        //채팅방 최근 생성 순으로 반환
        List<ChatRoom> result = new ArrayList<>(chatRooms.values());
        Collections.reverse(result);

        return result;
    }
    
  //채팅방 불러오기
    public List<ChattingRoom> findAll() {
        //채팅방 최근 생성 순으로 반환
        List<ChattingRoom> result = chattingRoomRepository.findAll();
        Collections.reverse(result);

        return result;
    }
    
    //방에 맞는 채팅방 불러오기
    public List<ChattingRoom> findByRoomId(Long roomId) {
        return chattingRoomRepository.findAllByRoomId(roomId).get();
    }
    
   //방에 맞는 채팅방 불러오기
    public ChattingRoom findByChatId(Long id) {
        return chattingRoomRepository.findById(id).get();
    }

    //채팅방 하나 불러오기
    public ChatRoom findById(Long roomId) {
        return chatRooms.get(roomId);
    }

    //채팅방 생성
    public ChatRoom createRoom(String name) {
        ChatRoom chatRoom = ChatRoom.create(no++);
        chatRooms.put(chatRoom.getChattingRoomId(), chatRoom);
        return chatRoom;
    }
    
    // 전체 채팅, 성별 채팅 생성
    public ChattingRoom createRoomInMeetingRoom(Long roomId) {
        ChattingRoom chattingRoom1 = ChattingRoom.ByMeettingRoomBuilder().roomId(roomId).type(0).build();
        chattingRoomRepository.save(chattingRoom1);
        ChattingRoom womenChatting = ChattingRoom.ByMeettingRoomBuilder().roomId(roomId).type(1).build();
        chattingRoomRepository.save(womenChatting);
        ChattingRoom menChatting = ChattingRoom.ByMeettingRoomBuilder().roomId(roomId).type(1).build();
        chattingRoomRepository.save(menChatting);
    	return chattingRoom1;
    }
}
