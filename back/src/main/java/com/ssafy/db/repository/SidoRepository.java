package com.ssafy.db.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.db.entity.Sido;

public interface SidoRepository extends JpaRepository<Sido, Long>{
	Optional<Sido> findById(Long id);
}
