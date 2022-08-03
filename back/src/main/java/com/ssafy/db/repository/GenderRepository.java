package com.ssafy.db.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.db.entity.Gender;

public interface GenderRepository extends JpaRepository<Gender, Long>{
	Optional<Gender> findByWaitingRoomId(Long id);
}
