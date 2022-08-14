package com.ssafy.db.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.db.entity.BalanceRelation;

public interface BalanceRelationRepository extends JpaRepository<BalanceRelation, Integer>{
	Optional<BalanceRelation> findById(long id);
	boolean existsByMeetingRoomId(long meetingRoomId);
	boolean existsByMeetingRoomIdAndBalanceId(long meetingRoomId, long balanceId);
}
