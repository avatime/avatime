package com.ssafy.db.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@DynamicInsert @DynamicUpdate
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Balance extends BaseEntity {
	
	@Column(updatable = false, nullable = false)
	private String a;
	
	@Column(updatable = false, nullable = false)
	private String b;
}