package com.ssafy.api.service;

import java.util.List;

import com.ssafy.db.entity.WaitingRoom;

public interface WaitingService {
	List<WaitingRoom> findAll();
}
