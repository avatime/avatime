package com.ssafy.api.service;

import java.util.Optional;

import com.ssafy.db.entity.Gender;

public interface GenderService {
	Optional<Gender> findById(Long id);
}
