package com.ssafy.db.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import lombok.Builder;
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
	private MeetingRoom meetingRoom;
	
    @Column(updatable = false, nullable = false, columnDefinition = "INT UNSIGNED")
	private Long userId;
	
    @Column(columnDefinition = "INT UNSIGNED")
	private Long avatarId;

    @Column(columnDefinition = "INT UNSIGNED")
    private Long pickUserId;
    
    private boolean matched;
    
    @Builder
    public MeetingRoomUserRelation(MeetingRoom meetingRoom, Long userId) {
    	this.meetingRoom = meetingRoom;
    	this.userId = userId;
    	this.avatarId = null;
    	this.pickUserId = null;
    }
}
