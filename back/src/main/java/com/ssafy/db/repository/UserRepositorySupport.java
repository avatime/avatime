package com.ssafy.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.QUser;
import com.ssafy.db.entity.User;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 * 유저 모델 관련 디비 쿼리 생성을 위한 구현 정의.
 */
@Repository
public class UserRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QUser qUser = QUser.user;

    public Optional<User> findUserByUserName(String name) {
        User user = jpaQueryFactory.select(qUser).from(qUser)
                .where(qUser.name.eq(name)).fetchOne();
        if(user == null) return Optional.empty();
        return Optional.ofNullable(user);
    }
    
    public Optional<User> findUserByUserName(String socialId, String socialType) {
        User user = jpaQueryFactory.select(qUser).from(qUser)
                .where(qUser.name.eq(socialId).and(qUser.socialType.eq(socialType))).fetchOne();
        if(user == null) return Optional.empty();
        return Optional.ofNullable(user);
    }
}
