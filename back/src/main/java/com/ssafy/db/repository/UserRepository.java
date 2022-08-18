package com.ssafy.db.repository;

import com.ssafy.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

import javax.transaction.Transactional;

/**
 * 유저 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
public interface UserRepository extends JpaRepository<User, Long> {
    // 아래와 같이, Query Method 인터페이스(반환값, 메소드명, 인자) 정의를 하면 자동으로 Query Method 구현됨.
    Optional<User> findByName(String name);
    Optional<User> findById(Long userId);
    Optional<User> findBySocialIdAndSocialType(String socialId, int socialType);
    Optional<User> findByNameAndGender(String name, String gender);
    Optional<User> findBySocialId(String socialId);
    Optional<User> findBySocialType(int socialType);
    boolean existsByName(String name);
    
    @Transactional
    void deleteById(Long userId);
}
