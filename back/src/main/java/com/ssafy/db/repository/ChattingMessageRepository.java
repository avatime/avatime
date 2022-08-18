package com.ssafy.db.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ssafy.db.entity.ChattingMessage;

@Repository
public interface ChattingMessageRepository extends JpaRepository<ChattingMessage, Long>{
	@Query(value = "select * from chatting_message cm where cm.chatting_room_id = :id", nativeQuery = true)
	List<ChattingMessage> findByChattingRoomId(@Param(value="id") Long chattingRoomId);
	
	Optional<List<ChattingMessage>> findByChattingRoom_Id(Long chattingRoomId);
}
