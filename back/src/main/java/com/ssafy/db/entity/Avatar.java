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

	@Column(nullable = false)
	private String imagePath;
	
	@Column(nullable = false)
	private String name;
	
	// 제작자
	@Column(columnDefinition = "INT UNSIGNED DEFAULT 0")
	private Long userId;
	
	@Column(columnDefinition = "INT UNSIGNED DEFAULT 0")
	private Long slot;
	
	@Column
	private String picPath;
}
