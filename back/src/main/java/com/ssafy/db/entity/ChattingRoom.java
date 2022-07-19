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

	@ManyToOne
	@JoinColumn(name = "using_room_id", insertable = false, updatable=false)
	private WaitingRoom waitingRoom;
	
    @Column(updatable = false, nullable = false, columnDefinition = "TINYINT(1)")
	private String type;
	
	@Temporal(TemporalType.TIMESTAMP)
    @Column(updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Date created_time;
    
    @PrePersist
    protected void onCreate() {
    	created_time = Timestamp.valueOf(LocalDateTime.now());
    }
}
