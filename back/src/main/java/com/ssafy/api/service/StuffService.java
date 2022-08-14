package com.ssafy.api.service;

import java.util.List;

import com.ssafy.db.entity.Stuff;

public interface StuffService {

	List<Stuff> findAll();
	Stuff findById(Long id);
}
