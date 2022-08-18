package com.ssafy.db.entity;

import javax.persistence.Column;
import javax.persistence.Entity;

import lombok.Getter;

/**
 * 지역 모델 정의.
 */
@Entity
@Getter
public class Age extends BaseEntity {

	@Column(updatable = false, nullable = false)
	private String name;
}
