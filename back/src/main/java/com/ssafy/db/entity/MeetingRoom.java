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

	@Column(updatable = false, nullable = false, length = 1, columnDefinition = "CHAR(1)")
	private String type;
	
    @Column(updatable = false, nullable = false, columnDefinition = "INT UNSIGNED")
	private Long main_session_id;
	
	@Temporal(TemporalType.TIMESTAMP)
    @Column(updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Date created_time;
    
    @PrePersist
    protected void onCreate() {
    	created_time = Timestamp.valueOf(LocalDateTime.now());
    }
}
