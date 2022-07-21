package com.ssafy.api.service;

import java.util.List;

import com.ssafy.db.entity.Sido;

public interface WaitingService {
	List<Sido> findAll();
}
