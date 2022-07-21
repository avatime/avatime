package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QWaitingRoomUserRelation is a Querydsl query type for WaitingRoomUserRelation
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QWaitingRoomUserRelation extends EntityPathBase<WaitingRoomUserRelation> {

    private static final long serialVersionUID = 337460685L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QWaitingRoomUserRelation waitingRoomUserRelation = new QWaitingRoomUserRelation("waitingRoomUserRelation");

    public final QBaseEntity _super = new QBaseEntity(this);

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final NumberPath<Integer> type = createNumber("type", Integer.class);

    public final NumberPath<Long> user_id = createNumber("user_id", Long.class);

    public final QWaitingRoom waitingRoom;

    public QWaitingRoomUserRelation(String variable) {
        this(WaitingRoomUserRelation.class, forVariable(variable), INITS);
    }

    public QWaitingRoomUserRelation(Path<? extends WaitingRoomUserRelation> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QWaitingRoomUserRelation(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QWaitingRoomUserRelation(PathMetadata metadata, PathInits inits) {
        this(WaitingRoomUserRelation.class, metadata, inits);
    }

    public QWaitingRoomUserRelation(Class<? extends WaitingRoomUserRelation> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.waitingRoom = inits.isInitialized("waitingRoom") ? new QWaitingRoom(forProperty("waitingRoom")) : null;
    }

}

