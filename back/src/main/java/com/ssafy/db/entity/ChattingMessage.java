package com.ssafy.db.entity;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.PrePersist;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import lombok.Getter;
import lombok.Setter;

/**
 * 채팅 메세지 모델 정의.
 */
@DynamicInsert @DynamicUpdate
@Entity
@Getter
@Setter
public class ChattingMessage extends BaseEntity {

	@Column(updatable = false, nullable = false, columnDefinition = "INT UNSIGNED")
	private Long chat_room_id;
	
	@Column(updatable = false, nullable = false, length=255)
	private String message;
	
	@Column(updatable = false, nullable = false, columnDefinition = "INT UNSIGNED")
	private Long user_id;
		
	@Temporal(TemporalType.TIMESTAMP)
	@Column(updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
	private Timestamp created_time;
	    
	@PrePersist
	protected void onCreate() {
	  	created_time = Timestamp.valueOf(LocalDateTime.now());
	}
}
