package com.ssafy.db.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * 미팅 대기 방에 참여한 유저 모델 정의.
 */
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicInsert @DynamicUpdate
@Entity
@Getter
@Setter
@ToString
public class WaitingRoomUserRelation extends BaseEntity {

	@Column(nullable = false)
	private int type;
	
	@ManyToOne
	private WaitingRoom waitingRoom;
	
    @ManyToOne
	private User user;
	
    @Builder
    public WaitingRoomUserRelation(int type, User user, WaitingRoom waitingRoom) {
    	this.type = type;
    	this.user = user;
    	this.waitingRoom = waitingRoom;
    }
}
