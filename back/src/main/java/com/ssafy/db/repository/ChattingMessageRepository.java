package com.ssafy.db.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.db.entity.ChattingMessage;

@Repository
public interface ChattingMessageRepository extends JpaRepository<ChattingMessage, Long>{
	Optional<List<ChattingMessage>> findAllByChattingRoomId(Long chattingRoomId);
}
