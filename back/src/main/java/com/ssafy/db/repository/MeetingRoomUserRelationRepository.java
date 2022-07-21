package com.ssafy.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.db.entity.MeetingRoomUserRelation;

/**
 * 미팅룸 - 유저 관꼐 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
@Repository
public interface MeetingRoomUserRelationRepository extends JpaRepository<MeetingRoomUserRelation, Long> {

}
