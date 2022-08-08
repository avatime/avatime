package com.ssafy.db.entity;

import javax.persistence.Column;
import javax.persistence.Entity;

import lombok.Getter;
import lombok.Setter;

/**
 * 동물 아바타 모델 정의.
 */
@Entity
@Getter
@Setter
public class Avatar extends BaseEntity {

	@Column(updatable = false, nullable = false)
	private String imagePath;
	
	@Column(updatable = false, nullable = false)
	private String name;
	
	@Column(columnDefinition = "INT UNSIGNED DEFAULT 0")
	private Long userId;
}
