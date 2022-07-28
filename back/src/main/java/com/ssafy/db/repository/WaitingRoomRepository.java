package com.ssafy.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.db.entity.WaitingRoom;

public interface WaitingRoomRepository extends JpaRepository<WaitingRoom, Long>{
}