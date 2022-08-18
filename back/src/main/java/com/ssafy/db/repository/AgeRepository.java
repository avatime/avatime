package com.ssafy.db.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.db.entity.Age;

public interface AgeRepository extends JpaRepository<Age, Long>{
	Optional<Age> findById(Long id);
}
