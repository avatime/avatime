package com.ssafy.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.db.entity.ChattingRoom;

@Repository
public interface ChattingRoomRepository extends JpaRepository<ChattingRoom, Long>{

}
