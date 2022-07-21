package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QAvatar is a Querydsl query type for Avatar
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QAvatar extends EntityPathBase<Avatar> {

    private static final long serialVersionUID = 1208574875L;

    public static final QAvatar avatar = new QAvatar("avatar");

    public final QBaseEntity _super = new QBaseEntity(this);

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final StringPath image_path = createString("image_path");

    public final StringPath name = createString("name");

    public QAvatar(String variable) {
        super(Avatar.class, forVariable(variable));
    }

    public QAvatar(Path<? extends Avatar> path) {
        super(path.getType(), path.getMetadata());
    }

    public QAvatar(PathMetadata metadata) {
        super(Avatar.class, metadata);
    }

}

