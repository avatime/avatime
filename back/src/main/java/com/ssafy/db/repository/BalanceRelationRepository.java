package com.ssafy.db.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.db.entity.Balance;
import com.ssafy.db.entity.BalanceRelation;

public interface BalanceRelationRepository extends JpaRepository<BalanceRelation, Integer>{
	Optional<BalanceRelation> findById(Long id);
	boolean existsByMeetingRoomId(Long meetingRoomId);
	boolean existsByMeetingRoomIdAndBalanceId(Long meetingRoomId, Long balanceId);
	List<BalanceRelation> findAllByMeetingRoomIdAndBalance(Long meetingRoomId, Balance balance);
}
