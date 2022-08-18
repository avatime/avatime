package com.ssafy.api.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.db.entity.Age;
import com.ssafy.db.repository.AgeRepository;

@Service("ageService")
public class AgeServiceImpl implements AgeService{
	@Autowired
	AgeRepository ageRepository;
	
	@Override
	public List<Age> findAll() {
		return ageRepository.findAll();
	}
	
	@Override
	public Optional<Age> findById(Long id) {
		return ageRepository.findById(id);
	}
}
