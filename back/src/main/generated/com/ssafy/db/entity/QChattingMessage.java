package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QChattingMessage is a Querydsl query type for ChattingMessage
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QChattingMessage extends EntityPathBase<ChattingMessage> {

    private static final long serialVersionUID = -294917409L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QChattingMessage chattingMessage = new QChattingMessage("chattingMessage");

    public final QBaseEntity _super = new QBaseEntity(this);

    public final QChattingRoom chattingRoom;

    public final StringPath content = createString("content");

    public final DateTimePath<java.util.Date> created_time = createDateTime("created_time", java.util.Date.class);

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final NumberPath<Long> user_id = createNumber("user_id", Long.class);

    public QChattingMessage(String variable) {
        this(ChattingMessage.class, forVariable(variable), INITS);
    }

    public QChattingMessage(Path<? extends ChattingMessage> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QChattingMessage(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QChattingMessage(PathMetadata metadata, PathInits inits) {
        this(ChattingMessage.class, metadata, inits);
    }

    public QChattingMessage(Class<? extends ChattingMessage> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.chattingRoom = inits.isInitialized("chattingRoom") ? new QChattingRoom(forProperty("chattingRoom")) : null;
    }

}

