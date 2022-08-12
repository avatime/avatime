package com.ssafy.db.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.db.entity.Avatar;

public interface AvatarRepository extends JpaRepository<Avatar, Long> {
	Optional<List<Avatar>> findAllByUserIdOrderBySlotDesc(Long userId);
	Optional<Avatar> findByUserIdAndSlot(Long userId, Long slot);
	boolean existsByUserIdAndSlot(Long userId, Long slot);
}
