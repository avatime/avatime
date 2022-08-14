insert into sido values ('0', '서울특별시');
insert into sido values ('0', '부산광역시');
insert into sido values ('0', '대구광역시');
insert into sido values ('0', '인천광역시');
insert into sido values ('0', '광주광역시');
insert into sido values ('0', '대전광역시');
insert into sido values ('0', '울산광역시');
insert into sido values ('0', '세종특별자치시');
insert into sido values ('0', '경기도');
insert into sido values ('0', '강원도');
insert into sido values ('0', '충청도');
insert into sido values ('0', '전라도');
insert into sido values ('0', '경상도');
insert into sido values ('0', '제주도');
insert into age values ('0', '20대');
insert into age values ('0', '30대');
insert into age values ('0', '40대');
insert into age values ('0', '50대 이상');
insert into waiting_room values ('0', '1', now(), '6', '파이썬 초보만', '1', '0');

insert into avatar (image_path, name) values ("액션가면.jpg", "액션가면");
insert into avatar (image_path, name) values ("헐크.jpg", "헐크");
insert into avatar (image_path, name) values ("조커.jpg", "조커");
insert into avatar (image_path, name) values ("지니.jpg", "지니");
insert into avatar (image_path, name) values ("아기조커.jpg", "아기조커");
insert into avatar (image_path, name) values ("햄찌우먼.png", "햄찌우먼");
insert into avatar (image_path, name) values ("수박맨.png", "수박맨");

insert into user (description, gender, name, profile_image_path, social_id, social_type) values ("testing3", "F", "채윤선", "https://avatimebucket2022.s3.ap-northeast-2.amazonaws.com/%ED%94%84%EB%A1%9C%ED%95%84/profile01.png", "5524137@naver.com", 1);
insert into user (description, gender, name, profile_image_path, social_id, social_type) values ("testing", "M", "정건우", "https://avatimebucket2022.s3.ap-northeast-2.amazonaws.com/%ED%94%84%EB%A1%9C%ED%95%84/profile01.png", "abcxj123@naver.com", 1);
insert into user (description, gender, name, profile_image_path, social_id, social_type) values ("testing2", "M", "이주영", "ss.png", "ssafy2@naver.com", 1);
insert into user (description, gender, name, profile_image_path, social_id, social_type) values ("testing3", "F", "이지나", "ts.png", "ssafy3@naver.com", 1);
insert into user (description, gender, name, profile_image_path, social_id, social_type) values ("testing", "M", "김찬영", "sf.png", "ssafy@naver.com", 1);
insert into user (description, gender, name, profile_image_path, social_id, social_type) values ("testing2", "F", "민경욱", "ss.png", "ssafy2@naver.com", 1);

insert into waiting_room_user_relation(type, waiting_room_id, user_id) values (0, 1, 1);
insert into waiting_room_user_relation(type, waiting_room_id, user_id) values (1, 1, 2);
insert into waiting_room_user_relation(type, waiting_room_id, user_id) values (1, 1, 3);
insert into waiting_room_user_relation(type, waiting_room_id, user_id) values (1, 1, 4);
insert into waiting_room_user_relation(type, waiting_room_id, user_id) values (1, 1, 5);
insert into waiting_room_user_relation(type, waiting_room_id, user_id) values (1, 1, 6);

insert into chatting_room (room_id, type) values (1, 2);

insert into profile(image_path, name) values
("https://avatimebucket2022.s3.ap-northeast-2.amazonaws.com/%ED%94%84%EB%A1%9C%ED%95%84/profile01.png", "프로필 1"),
("https://avatimebucket2022.s3.ap-northeast-2.amazonaws.com/%ED%94%84%EB%A1%9C%ED%95%84/profile02.png", "프로필 2"),
("https://avatimebucket2022.s3.ap-northeast-2.amazonaws.com/%ED%94%84%EB%A1%9C%ED%95%84/profile03.png", "프로필 3"),
("https://avatimebucket2022.s3.ap-northeast-2.amazonaws.com/%ED%94%84%EB%A1%9C%ED%95%84/profile04.png", "프로필 4"),
("https://avatimebucket2022.s3.ap-northeast-2.amazonaws.com/%ED%94%84%EB%A1%9C%ED%95%84/profile05.png", "프로필 5"),
("https://avatimebucket2022.s3.ap-northeast-2.amazonaws.com/%ED%94%84%EB%A1%9C%ED%95%84/profile06.png", "프로필 6"),
("https://avatimebucket2022.s3.ap-northeast-2.amazonaws.com/%ED%94%84%EB%A1%9C%ED%95%84/profile07.png", "프로필 7"),
("https://avatimebucket2022.s3.ap-northeast-2.amazonaws.com/%ED%94%84%EB%A1%9C%ED%95%84/profile08.png", "프로필 8"),
("https://avatimebucket2022.s3.ap-northeast-2.amazonaws.com/%ED%94%84%EB%A1%9C%ED%95%84/profile09.png", "프로필 9"),
("https://avatimebucket2022.s3.ap-northeast-2.amazonaws.com/%ED%94%84%EB%A1%9C%ED%95%84/profile10.png", "프로필 10");

insert into balance (a, b) values 
 ('오이케이크 먹기', '김치케이크 먹기'),
 ('모르는 사람 집에 애인속옷', '애인집에 모르는 사람 속옷');

insert into stuff(image_path, name) values
("", "당근"),
("", "오이"),
("", "가지"),
("", "새우");
