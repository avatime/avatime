package com.ssafy.api.service;

import java.util.List;
import java.util.Optional;

import com.ssafy.db.entity.Sido;

public interface SidoService {
	List<Sido> findAll();
	Optional<Sido> findById(Long id);
}