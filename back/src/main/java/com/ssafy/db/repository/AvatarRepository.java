package com.ssafy.db.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.db.entity.Avatar;

public interface AvatarRepository extends JpaRepository<Avatar, Long> {
	Optional<List<Avatar>> findAllByUserId(Long userId);
	boolean existsByName(String name);
}
