package com.ssafy.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.db.entity.Avatar;
import com.ssafy.db.repository.AvatarRepository;

@Service("avatarService")
public class AvatarServiceImpl implements AvatarService {

	@Autowired
	AvatarRepository avatarRepository;
	
	@Override
	public List<Avatar> findAll(){
		return avatarRepository.findAll();
	}
	
	@Override
	public Avatar findById(Long id) {
		return avatarRepository.findById(id).get();
	}
}
