package com.ssafy.db.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@DynamicInsert @DynamicUpdate
@Entity
@Getter
@Setter
public class BalanceRelation {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(updatable = false, nullable = false)
	private long id;
	
	@ManyToOne
	private long balanceId;
	
	@Column(nullable = false)
	private long meetingRoomId;
	
	@Column(nullable = false)
	private long userId;
	
	@Column(nullable = false)
	private boolean result;
}
