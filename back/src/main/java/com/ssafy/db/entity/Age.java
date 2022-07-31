package com.ssafy.db.entity;

import javax.persistence.Column;
import javax.persistence.Entity;

import lombok.Getter;
import lombok.Setter;

/**
 * 지역 모델 정의.
 */
@Entity
@Getter
@Setter
public class Age extends BaseEntity {

	@Column(updatable = false, nullable = false)
	private String name;
}
