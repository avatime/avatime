package com.ssafy.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.db.entity.Stuff;
import com.ssafy.db.repository.StuffRepository;

@Service("stuffService")
public class StuffServiceImpl implements StuffService {

	@Autowired
	StuffRepository stuffRepository;
	
	@Override
	public List<Stuff> findAll(){
		return stuffRepository.findAll();
	}
	
	@Override
	public Stuff findById(Long id) {
		return stuffRepository.findById(id).get();
	}

}
