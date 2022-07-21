package com.ssafy.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.db.entity.WaitingRoomUserRelation;

@Repository
public interface WaitingRoomUserRelationRepository extends JpaRepository<WaitingRoomUserRelation, Long>{

}