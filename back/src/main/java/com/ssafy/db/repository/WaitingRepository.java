package com.ssafy.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.db.entity.Sido;

@Repository
public interface WaitingRepository extends JpaRepository<Sido, Long>{

}
