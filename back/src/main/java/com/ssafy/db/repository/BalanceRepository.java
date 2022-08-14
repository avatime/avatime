package com.ssafy.db.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.db.entity.Balance;

public interface BalanceRepository extends JpaRepository<Balance, Integer>{
	Optional<Balance> findById(Long id);
}
