package com.ssafy.api.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.db.entity.Profile;
import com.ssafy.db.repository.ProfileRepository;

@Service("ProfileService")
public class ProfileServiceImpl implements ProfileService {
	@Autowired
	ProfileRepository profileRepository;
	
	@Override
	public List<Profile> getProfileAll() {
		
		return profileRepository.findAll();
	}
	
	@Override
	public Profile getProfile(Long profileId) {
		Profile profile = profileRepository.findById(profileId).get();
		return profile;
	}
	

}
