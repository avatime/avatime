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

	@Override
	public List<Avatar> findAllByUserId(Long userId) {
		// TODO Auto-generated method stub
		return avatarRepository.findAllByUserIdOrderBySlotDesc(userId).get();
	}
	
	@Override
	public void saveAvatar(Avatar avatar) {
		avatarRepository.save(avatar);
	}

	@Override
	public boolean isExistAvatar(Long userId, Long slot) {
		// TODO Auto-generated method stub
		return avatarRepository.existsByUserIdAndSlot(userId, slot);
	}

	@Override
	public Avatar findByUserIdAndSlot(Long userId, Long slot) {
		// TODO Auto-generated method stub
		return avatarRepository.findByUserIdAndSlot(userId, slot).orElse(new Avatar());
	}
	
	@Override
	public boolean checkAvatarName(String name) {
		boolean response;
		response = avatarRepository.existsByName(name);
		System.out.println("response: " + response);
		return response;
	}

}
