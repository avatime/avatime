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

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * 유저 모델 정의.
 */
@DynamicInsert @DynamicUpdate
@Entity
@Getter
@Setter
@ToString
public class User extends BaseEntity{
	@Column(updatable = false, nullable = false)
    private String gender;
	
    @Column(nullable = false, unique = true, length = 20)
    private String name;
    
    @Column(columnDefinition = "TEXT")
    private String description;
	
    @JsonProperty
    @Column(updatable = false, nullable = false)
    private String profileImagePath;
	
    @JsonProperty
    @Column(updatable = false, nullable = false)
    private int socialType;
	
    @JsonProperty
    @Column(updatable = false, nullable = false)
    private String socialId;
    
    @Temporal(TemporalType.TIMESTAMP)
    @Column(updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Date createdTime;
    
    @PrePersist
    protected void onCreate() {
    	createdTime = Timestamp.valueOf(LocalDateTime.now());
    }
    
//    @JsonIgnore
//    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
//    String password;
//    
//    String userId;
}
