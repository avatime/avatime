package com.ssafy.api.service;

import java.util.List;

import com.ssafy.db.entity.Avatar;

public interface AvatarService {

	List<Avatar> findAll();
	List<Avatar> findAllByUserId(Long userId);
	Avatar findById(Long id);
	Avatar findByUserIdAndSlot(Long userId, Long slot);
	void saveAvatar(Avatar avatar);
	boolean isExistAvatar(Long userId, Long slot);
}
