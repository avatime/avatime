package com.ssafy.db.entity;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Date;

import javax.annotation.Nonnull;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.PrePersist;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * 채팅방 모델 정의.
 */
@DynamicInsert @DynamicUpdate
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ChattingRoom extends BaseEntity {

	@Column(name = "room_id", nullable = false, columnDefinition = "INT UNSIGNED")
	private Long roomId;
	
    @Column(updatable = false, nullable = false, columnDefinition = "TINYINT(1)")
	private int type;
	
	@Temporal(TemporalType.TIMESTAMP)
    @Column(name="created_time", updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Date createdTime;
    	
    @PrePersist
    protected void onCreate() {
    	createdTime = Timestamp.valueOf(LocalDateTime.now());
    }
    
    @Builder(builderClassName = "ByWaitingRoomBuilder", builderMethodName = "ByWaitingRoomBuilder")
    public ChattingRoom(@Nonnull Long roomId) {
    	this.roomId = roomId;
    	this.type = 2;
    }
    
    @Builder(builderClassName = "ByMeettingRoomBuilder", builderMethodName = "ByMeettingRoomBuilder")
    public ChattingRoom(@Nonnull Long roomId, int type) {
    	this.roomId = roomId;
    	this.type = type;
    }
}
