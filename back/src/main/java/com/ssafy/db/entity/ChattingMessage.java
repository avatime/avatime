package com.ssafy.db.entity;

import java.util.Date;
import java.sql.Timestamp;
import java.time.LocalDateTime;

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
 * 채팅 메세지 모델 정의.
 */
@DynamicInsert @DynamicUpdate
@Entity
@Getter
@Setter
public class ChattingMessage extends BaseEntity {

	@ManyToOne
	@JoinColumn(name = "chat_room_id", insertable = false, updatable=false)
	private ChattingRoom chattingRoom;
	
	@Column(updatable = false, nullable = false, length=255)
	private String content;
	
	@Column(updatable = false, nullable = false, columnDefinition = "INT UNSIGNED")
	private Long userId;
		
	@Temporal(TemporalType.TIMESTAMP)
	@Column(updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
	private Date createdTime;
	    
	@PrePersist
	protected void onCreate() {
	  	createdTime = Timestamp.valueOf(LocalDateTime.now());
	}
}
