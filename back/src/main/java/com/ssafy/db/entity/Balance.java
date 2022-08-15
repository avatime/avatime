package com.ssafy.db.entity;

import javax.persistence.Column;
import javax.persistence.Entity;

import lombok.Getter;


@Entity
@Getter
public class Balance extends BaseEntity{
	
	@Column(updatable = false, nullable = false)
	private String a;
	
	@Column(updatable = false, nullable = false)
	private String b;
}