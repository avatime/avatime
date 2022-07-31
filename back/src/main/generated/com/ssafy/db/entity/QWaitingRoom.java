package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QWaitingRoom is a Querydsl query type for WaitingRoom
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QWaitingRoom extends EntityPathBase<WaitingRoom> {

    private static final long serialVersionUID = 1473319878L;

    public static final QWaitingRoom waitingRoom = new QWaitingRoom("waitingRoom");

    public final QBaseEntity _super = new QBaseEntity(this);

    public final NumberPath<Integer> age = createNumber("age", Integer.class);

    public final DateTimePath<java.util.Date> created_time = createDateTime("created_time", java.util.Date.class);

    public final NumberPath<Integer> head_count = createNumber("head_count", Integer.class);

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final StringPath name = createString("name");

    public final NumberPath<Integer> sido_id = createNumber("sido_id", Integer.class);

    public final NumberPath<Integer> status = createNumber("status", Integer.class);

    public QWaitingRoom(String variable) {
        super(WaitingRoom.class, forVariable(variable));
    }

    public QWaitingRoom(Path<? extends WaitingRoom> path) {
        super(path.getType(), path.getMetadata());
    }

    public QWaitingRoom(PathMetadata metadata) {
        super(WaitingRoom.class, metadata);
    }

}

