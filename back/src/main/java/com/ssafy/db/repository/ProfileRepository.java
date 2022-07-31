package com.ssafy.db.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.db.entity.Profile;
import com.ssafy.db.entity.User;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
	Optional<Profile> findById(Long profileId);
}





