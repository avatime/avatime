package com.ssafy.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.db.entity.WaitingRoom;

@Repository
public interface WaitingRoomRepository extends JpaRepository<WaitingRoom, Long>{
}