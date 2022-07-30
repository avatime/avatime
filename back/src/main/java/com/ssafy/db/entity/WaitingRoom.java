package com.ssafy.db.entity;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import com.fasterxml.jackson.annotation.JsonProperty;

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
	private int headCount;
	
	@Column(nullable = false, columnDefinition = "TINYINT DEFAULT 0")
	private int status;
	
	@Column(nullable = false)
	private long age;
	
	@Column(nullable = false)
	private long sidoId;
	
	@Temporal(TemporalType.TIMESTAMP)
    @Column(updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
	@JsonProperty("created_time")
    private Date createdTime;
    
	@OneToMany()
	
    @PrePersist
    protected void onCreate() {
    	createdTime = Timestamp.valueOf(LocalDateTime.now());
    }

    @Builder
    public WaitingRoom(String name, int headCount, long age, long sido_id) {
    	this.name = name;
    	this.headCount = headCount;
    	this.age = age;
    	this.status = 0;
    	this.sidoId = sido_id;
    }
}
