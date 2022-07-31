package com.ssafy.api.service;

import java.util.List;

import com.ssafy.db.entity.Avatar;

public interface AvatarService {

	List<Avatar> findAll();
	Avatar findById(Long id);
}
