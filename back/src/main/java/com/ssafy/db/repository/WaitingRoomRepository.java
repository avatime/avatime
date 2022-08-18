package com.ssafy.db.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.db.entity.WaitingRoom;

public interface WaitingRoomRepository extends JpaRepository<WaitingRoom, Long>{
	Optional<WaitingRoom> findById(Long waitingRoomId);
}