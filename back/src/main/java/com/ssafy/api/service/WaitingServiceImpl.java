package com.ssafy.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.db.entity.WaitingRoom;
import com.ssafy.db.repository.WaitingRepository;

@Service("waitingService")
public class WaitingServiceImpl implements WaitingService{
	@Autowired
	WaitingRepository waitingRepository;
	
	@Override
	public List<WaitingRoom> findAll() {
		return waitingRepository.findAll();
	}
}