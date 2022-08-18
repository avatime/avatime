package com.ssafy.db.entity;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.PrePersist;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/**
 * 미팅룸 모델 정의.
 */
@DynamicInsert @DynamicUpdate
@Entity
@Getter
@Setter
public class MeetingRoom  extends BaseEntity {

	@Column(nullable = false, length = 1, columnDefinition = "TINYINT(1)")
	private int type;
	
    @Column(columnDefinition = "INT UNSIGNED")
	private Long mainSessionId;
    
    @Column(length = 1, columnDefinition = "TINYINT(1) DEFAULT 0")
   	private int status;
    
    @Column(columnDefinition = "INT DEFAULT 0")
   	private int balance;
    
    @Column(columnDefinition = "INT DEFAULT 0")
   	private int stuff;
    
	@Column(nullable = false)
	private int headCount;
	
	@Temporal(TemporalType.TIMESTAMP)
    @Column(updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Date createdTime;
    
    @PrePersist
    protected void onCreate() {
    	createdTime = Timestamp.valueOf(LocalDateTime.now());
    }
    
    @Builder
    public MeetingRoom() {
    	this.type = 0;
    	this.mainSessionId = null;
    	this.status = 0;
    }
}
