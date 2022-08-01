package com.ssafy.api.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.db.entity.Gender;
import com.ssafy.db.repository.GenderRepository;

@Service("genderService")
public class GenderServiceImpl implements GenderService{
	
	@Autowired
	GenderRepository genderRepository;
	
	@Override
	public Optional<Gender> findById(Long id) {
		return genderRepository.findByWaitingRoomId(id);
	}
}
