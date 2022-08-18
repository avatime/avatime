package com.ssafy.db.entity;

import javax.persistence.Column;
import javax.persistence.Entity;

import lombok.Getter;
import lombok.Setter;

/**
 * 물건 모델 정의.
 */
@Entity
@Getter
@Setter
public class Stuff extends BaseEntity {

	@Column(updatable = false, nullable = false)
	private String imagePath;
	
	@Column(updatable = false, nullable = false)
	private String name;
}
