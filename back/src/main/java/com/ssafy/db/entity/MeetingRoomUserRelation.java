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
	
    @ManyToOne
	private User user;
	
    @Column(columnDefinition = "INT UNSIGNED")
	private Long avatarId;

    @Column(columnDefinition = "INT UNSIGNED")
    private Long pickUserId;
    
    private boolean matched;
    
    @Builder
    public MeetingRoomUserRelation(MeetingRoom meetingRoom, User user) {
    	this.meetingRoom = meetingRoom;
    	this.user = user;
    	this.avatarId = null;
    	this.pickUserId = null;
    }
}
