package com.ssafy.db.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.db.entity.ChattingRoom;

public interface ChattingRoomRepository extends JpaRepository<ChattingRoom, Long>{
	Optional<List<ChattingRoom>> findAllByRoomId(Long roomId);
	Optional<ChattingRoom> findById(Long id);
}
