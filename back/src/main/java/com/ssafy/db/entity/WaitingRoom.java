package com.ssafy.db.entity;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.PrePersist;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import lombok.Getter;
import lombok.Setter;

/**
 * 미팅 대기 방 모델 정의.
 */
@DynamicInsert @DynamicUpdate
@Entity
@Getter
@Setter
public class WaitingRoom  extends BaseEntity {

	@Column(nullable = false, length = 30)
	private String name;
	
	@Column(nullable = false)
	private int head_count;
	
	@Column(nullable = false, columnDefinition = "TINYINT DEFAULT 0")
	private boolean status;
	
	private int age;
	
	@Column(nullable = false, columnDefinition = "INT UNSIGNED")
	private Long sido_id;
	
	@Temporal(TemporalType.TIMESTAMP)
    @Column(updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp created_time;
    
    @PrePersist
    protected void onCreate() {
    	created_time = Timestamp.valueOf(LocalDateTime.now());
    }
}
