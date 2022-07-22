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

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 미팅 대기 방 모델 정의.
 */
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicInsert @DynamicUpdate
@Entity
@Getter
@Setter
public class WaitingRoom extends BaseEntity {

	@Column(nullable = false, length = 30)
	private String name;
	
	@Column(nullable = false)
	private int head_count;
	
	@Column(nullable = false, columnDefinition = "TINYINT DEFAULT 0")
	private int status;
	
	private int age;
	
	@Column(nullable = false)
	private int sido_id;
	
	@Temporal(TemporalType.TIMESTAMP)
    @Column(updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Date created_time;
    
    @PrePersist
    protected void onCreate() {
    	created_time = Timestamp.valueOf(LocalDateTime.now());
    }
    
    @Builder
    public WaitingRoom(String name, int head_count, int age, int sido_id) {
    	this.name = name;
    	this.head_count = head_count;
    	this.age = age;
    	this.status = 0;
    	this.sido_id = sido_id;
    }
}
