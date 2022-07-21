package com.ssafy.db.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import lombok.Getter;
import lombok.Setter;

/**
 * 미팅에 참가한 유저 모델 정의.
 */
@DynamicInsert @DynamicUpdate
@Entity
@Getter
@Setter
public class MeetingRoomUserRelation  extends BaseEntity {

	@ManyToOne
	@JoinColumn(name = "session_id", insertable = false, updatable=false)
	private MeetingRoom meetingRoom;
	
    @Column(name="user_id", updatable = false, nullable = false, columnDefinition = "INT UNSIGNED")
	private Long userId;
	
    @Column(name = "avatar_id",columnDefinition = "INT UNSIGNED")
	private Long avatarId;

    @Column(name="pick_user_id",columnDefinition = "INT UNSIGNED")
    private Long pickUserId;
    
    private boolean matched;
}
