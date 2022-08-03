package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMeetingRoomUserRelation is a Querydsl query type for MeetingRoomUserRelation
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QMeetingRoomUserRelation extends EntityPathBase<MeetingRoomUserRelation> {

    private static final long serialVersionUID = 367023547L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMeetingRoomUserRelation meetingRoomUserRelation = new QMeetingRoomUserRelation("meetingRoomUserRelation");

    public final QBaseEntity _super = new QBaseEntity(this);

    public final NumberPath<Long> avatarId = createNumber("avatarId", Long.class);

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final BooleanPath matched = createBoolean("matched");

    public final QMeetingRoom meetingRoom;

    public final NumberPath<Long> pickUserId = createNumber("pickUserId", Long.class);

    public final QUser user;

    public QMeetingRoomUserRelation(String variable) {
        this(MeetingRoomUserRelation.class, forVariable(variable), INITS);
    }

    public QMeetingRoomUserRelation(Path<? extends MeetingRoomUserRelation> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMeetingRoomUserRelation(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMeetingRoomUserRelation(PathMetadata metadata, PathInits inits) {
        this(MeetingRoomUserRelation.class, metadata, inits);
    }

    public QMeetingRoomUserRelation(Class<? extends MeetingRoomUserRelation> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.meetingRoom = inits.isInitialized("meetingRoom") ? new QMeetingRoom(forProperty("meetingRoom")) : null;
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user")) : null;
    }

}

