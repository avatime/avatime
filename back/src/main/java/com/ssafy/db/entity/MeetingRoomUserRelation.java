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
	
    @Column(updatable = false, nullable = false, columnDefinition = "INT UNSIGNED")
	private Long user_id;
	
    @Column(columnDefinition = "INT UNSIGNED")
	private Long avatar_id;

}
