package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QChattingRoom is a Querydsl query type for ChattingRoom
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QChattingRoom extends EntityPathBase<ChattingRoom> {

    private static final long serialVersionUID = -207600381L;

    public static final QChattingRoom chattingRoom = new QChattingRoom("chattingRoom");

    public final QBaseEntity _super = new QBaseEntity(this);

    public final DateTimePath<java.util.Date> createdTime = createDateTime("createdTime", java.util.Date.class);

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final NumberPath<Long> roomId = createNumber("roomId", Long.class);

    public final NumberPath<Integer> type = createNumber("type", Integer.class);

    public QChattingRoom(String variable) {
        super(ChattingRoom.class, forVariable(variable));
    }

    public QChattingRoom(Path<? extends ChattingRoom> path) {
        super(path.getType(), path.getMetadata());
    }

    public QChattingRoom(PathMetadata metadata) {
        super(ChattingRoom.class, metadata);
    }

}

