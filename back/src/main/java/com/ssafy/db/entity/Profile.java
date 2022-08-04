package com.ssafy.db.entity;

import javax.persistence.Column;
import javax.persistence.Entity;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

/**
 * 프로필 모델 정의.
 */
@Entity
@Getter
@Setter
public class Profile extends BaseEntity {

	@JsonProperty("image_path")
	@Column(updatable = false, nullable = false)
	private String imagePath;
	
	@Column(updatable = false, nullable = false)
	private String name;
}
