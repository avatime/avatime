package com.ssafy.db.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.db.entity.WaitingRoomUserRelation;

public interface WaitingRoomUserRelationRepository extends JpaRepository<WaitingRoomUserRelation, Long>{
	List<WaitingRoomUserRelation> findByWaitingRoomIdAndType(Long wrId, int type);
}