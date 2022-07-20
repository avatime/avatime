package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QSido is a Querydsl query type for Sido
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QSido extends EntityPathBase<Sido> {

    private static final long serialVersionUID = 846473251L;

    public static final QSido sido = new QSido("sido");

    public final QBaseEntity _super = new QBaseEntity(this);

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final StringPath name = createString("name");

    public QSido(String variable) {
        super(Sido.class, forVariable(variable));
    }

    public QSido(Path<? extends Sido> path) {
        super(path.getType(), path.getMetadata());
    }

    public QSido(PathMetadata metadata) {
        super(Sido.class, metadata);
    }

}

