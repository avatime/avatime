package com.ssafy.db.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.db.entity.WaitingRoomUserRelation;

public interface WaitingRoomUserRelationRepository extends JpaRepository<WaitingRoomUserRelation, Long>{
	List<WaitingRoomUserRelation> findByWaitingRoomIdAndType(Long wrId, int type);
	Optional<List<WaitingRoomUserRelation>> findByWaitingRoomId(Long wrId);
	Optional<WaitingRoomUserRelation> findByWaitingRoomIdAndUserId(Long wrId, Long userId);
}