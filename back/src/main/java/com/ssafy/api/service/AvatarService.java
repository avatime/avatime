package com.ssafy.api.service;

import java.util.List;

import com.ssafy.db.entity.Avatar;

public interface AvatarService {

	List<Avatar> findAll();
	List<Avatar> findAllByUserId(Long UserId);
	Avatar findById(Long id);
	void saveAvatar(Avatar avatar);
	boolean checkAvatarName(String name);
}
