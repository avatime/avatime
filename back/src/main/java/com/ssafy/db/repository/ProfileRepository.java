package com.ssafy.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.db.entity.Profile;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, Long> {
	
}





