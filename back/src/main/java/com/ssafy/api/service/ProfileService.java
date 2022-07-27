package com.ssafy.api.service;

import java.util.List;
import java.util.Optional;

import com.ssafy.db.entity.Profile;

public interface ProfileService {
	List<Profile> getProfileAll();
	Profile getProfile(Long profileId);
}
