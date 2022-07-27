package com.ssafy.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.db.entity.WaitingRoomUserRelation;

public interface WaitingRoomUserRelationRepository extends JpaRepository<WaitingRoomUserRelation, Long>{

}