package com.ssafy.db.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.db.entity.MeetingRoomUserRelation;

/**
 * 미팅룸 - 유저 관계 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
public interface MeetingRoomUserRelationRepository extends JpaRepository<MeetingRoomUserRelation, Long> {

	Optional<MeetingRoomUserRelation>findByMeetingRoomIdAndUserId(Long meetingRoomId, Long userId);
	List<MeetingRoomUserRelation> findAllByMeetingRoomId(Long meetingRoomId);
	List<MeetingRoomUserRelation> findAllByMeetingRoomIdOrderByStuffId(Long meetingRoomId);
    boolean existsByMeetingRoomIdAndAvatarId(Long meetingRoomId, Long avatarId);
    boolean existsByMeetingRoomIdAndUserId(Long meetingRoomId, Long userId);
    List<MeetingRoomUserRelation> findAllByMeetingRoomIdAndLeftMeeting(Long meetingRoomId, boolean leftMeeting);
    int countByMeetingRoomIdAndLeftMeeting(Long meetingRoomId, boolean leftMeeting);
    boolean existsByMeetingRoomIdAndStuffId(Long meetingRoomId, Long stuffId);
    Optional<List<MeetingRoomUserRelation>> findByMeetingRoomIdAndStuffId(Long meetingRoomId, Long stuffId);
	int countByMeetingRoomIdAndAvatarIdNotNull(Long meetingRoomId);
}
