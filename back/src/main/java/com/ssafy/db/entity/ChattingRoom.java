package com.ssafy.db.entity;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/**
 * 채팅방 모델 정의.
 */
@DynamicInsert @DynamicUpdate
@Entity
@Getter
@Setter
public class ChattingRoom extends BaseEntity {

	@Column(nullable = false, columnDefinition = "INT UNSIGNED")
	private Long room_id;
	
    @Column(updatable = false, nullable = false, columnDefinition = "TINYINT(1)")
	private int type;
	
	@Temporal(TemporalType.TIMESTAMP)
    @Column(updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Date created_time;
    
    @PrePersist
    protected void onCreate() {
    	created_time = Timestamp.valueOf(LocalDateTime.now());
    }
    
    @Builder(builderClassName = "ByWaitingRoomBuilder", builderMethodName = "ByWaitingRoomBuilder")
    public ChattingRoom(Long room_id) {
    	this.room_id = room_id;
    	this.type = 2;
    }
}