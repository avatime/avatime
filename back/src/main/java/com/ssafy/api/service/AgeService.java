package com.ssafy.api.service;

import java.util.List;
import java.util.Optional;

import com.ssafy.db.entity.Age;

public interface AgeService {
	List<Age> findAll();
	Optional<Age> findById(Long id);
}