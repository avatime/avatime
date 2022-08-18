package com.ssafy.db.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.db.entity.ChattingRoom;

public interface ChattingRoomRepository extends JpaRepository<ChattingRoom, Long>{
	Optional<List<ChattingRoom>> findAllByRoomId(Long roomId);
	Optional<List<ChattingRoom>> findAllByRoomIdAndType(Long roomId, int type, Sort sort);
	Optional<ChattingRoom> findById(Long id);
	Optional<ChattingRoom> findByRoomIdAndType(Long roomId, int type);
}
