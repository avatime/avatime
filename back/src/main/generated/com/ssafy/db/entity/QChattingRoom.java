package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QChattingRoom is a Querydsl query type for ChattingRoom
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QChattingRoom extends EntityPathBase<ChattingRoom> {

    private static final long serialVersionUID = -207600381L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QChattingRoom chattingRoom = new QChattingRoom("chattingRoom");

    public final QBaseEntity _super = new QBaseEntity(this);

    public final DateTimePath<java.util.Date> created_time = createDateTime("created_time", java.util.Date.class);

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final StringPath type = createString("type");

    public final QWaitingRoom waitingRoom;

    public QChattingRoom(String variable) {
        this(ChattingRoom.class, forVariable(variable), INITS);
    }

    public QChattingRoom(Path<? extends ChattingRoom> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QChattingRoom(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QChattingRoom(PathMetadata metadata, PathInits inits) {
        this(ChattingRoom.class, metadata, inits);
    }

    public QChattingRoom(Class<? extends ChattingRoom> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.waitingRoom = inits.isInitialized("waitingRoom") ? new QWaitingRoom(forProperty("waitingRoom")) : null;
    }

}

