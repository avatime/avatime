package com.ssafy.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.db.entity.Stuff;

public interface StuffRepository extends JpaRepository<Stuff, Long> {
	
}
